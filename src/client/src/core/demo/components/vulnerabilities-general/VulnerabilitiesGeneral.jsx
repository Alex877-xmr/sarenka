import ChartVulnerabilitiesYears from "./ChartVulnerabilitiesYears";

import "./VulnerabilitiesGeneral.scss";

const VulnerabilitiesGeneral = () => {
  return (
    <section className="vulnerabilities-general">
      VulnerabilitiesGeneral
      <div className="vulnerabilities-general__left">
        <ChartVulnerabilitiesYears />
      </div>
      <div className="vulnerabilities-general__right">
        {/* duży chart z latami */}
        jakieś widgety z danymi
      </div>
    </section>
  );
};

export default VulnerabilitiesGeneral;
