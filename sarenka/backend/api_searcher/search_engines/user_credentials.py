"""
Moduł do przechowywania danych użytkownika takich jak klucze do serwisów,
które wymagają kont dla korzystania z ich api i/lub funkcjonalności.
"""
import json
from .censys_engine.censys_credentials import CensysCredentials
from .shodan_engine.shodan_credentials import ShodanCredentials
import os

class UserCredentialsError(Exception):
    """
    Zgłoszenie wyjąktu gdy są problemy z danymi użytkownika do serwisów trzecich.
    """
    def __init__(self, message=None, errors=None):
        super().__init__(message)
        self.errors = errors


class UserCredentials:
    """Singleton - Klasa przechowująca dane użytkownika do serwisów trzecich niezbędne do korzystania z ich funkcjonalności."""
    __instance = None
    __config_file = "user_credentials.json"

    def __init__(self):

        if not UserCredentials.__instance:
            filename =  "C:\\Users\\dp\\Desktop\\sarenka\\sarenka\\backend\\api_searcher\\search_engines\\user_credentials.json"
            print("PLIK nazwa: ", filename)
            try:
                with open(filename) as f:
                    data = json.load(f)
                print("PLIK: ", data)
            except FileNotFoundError:
                raise UserCredentialsError("User credential file does not exist. "
                                           "Please create file sarenka/backend/api_searcher/search_engines/user_credentials.json "
                                           "or clone from repository https://github.com/pawlaczyk/sarenka")

            self.__censys = CensysCredentials(data.get("censys", None))
            self.__shodan = ShodanCredentials(data.get("shodan", None))
        else:
            self.getInstance()

    @classmethod
    def getInstance(cls):
        if not cls.__instance:
            cls.__instance = UserCredentials()
        return cls.__instance

    @property
    def censys(self):
        return self.__censys

    @property
    def shodan(self):
        return self.__shodan