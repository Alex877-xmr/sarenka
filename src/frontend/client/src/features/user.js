/* do reguxtoolki
 on teraz jak nie ma samego Reduxa upraszcza wiele rzeczy
 dodatkowo jak się apkę react stworzy z templatu Reduxa to też tworzy folder `features`
 */

//  https://redux-toolkit.js.org/api/createSlice kopia kodu JS
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// https://redux-toolkit.js.org/api/createAsyncThunk

const initialState = {
  isAuthenticated: false,
  user: null,
  //   można pokazywać spinnery jak się ładuje
  loading: false,
  //   będzie true jak prawidłowo zarejestrujemy konto
  registered: false,
  // FIXME można dodać błąd
  error: null,
};

// https://redux-toolkit.js.org/api/createAsyncThunk
// udeżam do endpoint a z sarenka\src\frontend\routes\auth\register.js
// awsync jeden parametr któy jest obiektem
// WARNING register is actionCreator
// export bo chcę tę funkcję do registerPage
export const register = createAsyncThunk(
  // https://redux-toolkit.js.org/api/createAsyncThunk#type
  // WARNING liczba mnoga "users/register"
  "users/register",
  // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
  // If you need to pass in multiple values, pass them together in an object when you dispatch the thunk, like dispatch(fetchUsers({status: 'active', sortBy: 'name'})).
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    //WARNING alternatywnie https://youtu.be/cvu6a3P9S0M?t=1010
    // async (arg, thunkAPI) => {
    // const body = JSON.strignify(arg)

    // żadanie do servera express
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });

    try {
      // BUG CORS
      // const res = await fetch(`${API_URL}/api/users/register`, {
      // WARNIGN - teraz używam proxy z develmpnetu, ale na priodukcji i tak to będzi ena localhost 5000
      const res = await fetch("api/users/register", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
        }),
      });

      // dane z RegisterView z sarenka\src\service-core\users\views.py
      const data = await res.json();

      if (res.status === 201) {
        // WARNING https://youtu.be/cvu6a3P9S0M?t=1164
        // tu też możnaby aktualizaowac user z initialState, ale osobny handler będzie lepszy
        return data;
      } else {
        // WARNING /api/users/register/rejected z dokumentacji
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ttuaj nie mam data
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* synchronous dispatches
  so synchronous dispatches now redux thunk has the thunk middleware by default, and then it has something called a create async thunk https://redux-toolkit.js.org/api/createAsyncThunk
  which is going to allow you to actually do the asynchronous dispatches
  so these async thunks are something that we can go ahead and utilize
  Now these  async thunks are something that we define outside of this slice

  So with this reduces whatever's inside of here it's generating actions creators, but now we're gonna have action creators that are defined outside of here
  */

    // synchroniczne reset na stronie login
    resetRegistered: (state) => {
      // po prawidłowej rejestracji i zalogowaniu
      state.registered = false;
    },
  },

  // WARNING https://redux-toolkit.js.org/api/createSlice#parameters
  extraReducers: (builder) => {
    // ddoanie actionCreator pending, fulfilled, rejected z  dokumendacji
    builder
      // .addCase(register.pending, (state, action) => {
      //WARNING  nie uzywam action to nie muszę brać argumentu
      .addCase(register.pending, (state) => {
        // można bezpośrednio zmieniać stan, nie koniecznei przez return i spread operator
        state.loading = true;
      })
      // .addCase(register.fulfilled, (state, action) => {
      .addCase(register.fulfilled, (state) => {
        // wszystko się udało, zmieniam wartośc- na podstawie jej będe przekierowywać usera to srony logowania
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        // NIE udało się
        state.loading = false;
        // FIXME można dodac błąd i zapisac go do state
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
