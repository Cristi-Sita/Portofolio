# Portofolio

## Flight search engine with forecast weather at origin and destination.

 #### This is a full-stack app composed of three parts:
 
   ##### Back-end (external api: SkyScanner & Open Wheather) Node JS: https://github.com/Cristi-Sita/Portofolio/tree/FlightSearchNodeJS ;
   ##### Data Base: MySQL;
   ##### Front-end React Js: https://github.com/Cristi-Sita/Portofolio/tree/FlightSearchReact .
 
 The Front-end have a basic form for the parameters required by SkyScanner (few of they are harcoded), at the submit it will be sent to Back-end. Will display last five entries from DB and of course wheather on departure date at origin and destination. It will access just the Back-end, nothing else, through a few endpoints.<br />
 After completing the form and pressing the search button, after a while, you receive some live answers with the travel price that can be reserved by pressing the buy button. <br />
 UI is responsive: pure CSS.
 The Back-end part will do all jobs like:<br />
                - send and receive data from Front-end;<br />
                - deal with all the endpoints from the external API;<br />
                - manage DB: new entry, updates etc.<br />
 Working example: https://portofolio-git-flightsearchreact.cristisita.now.sh/ 
