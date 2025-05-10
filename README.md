# FlagExplorerApp

Overview:
Application to display all country flags in a grid layout.  When a flag is clicked, details get displayed about the country: Country name, Population, Capital


***************************************************************************
BACKEND:
***************************************************************************
Swagger based .NET Core API that returns the following data:  
	"id": "string",
    	"name": "string",
    	"capital": "string",
    	"population": 0,
    	"flagUrl": "string"

How to call the API ?
Step 1)
Open the Backend Api Solution 

Make sure the ApiApplication is set as the startup project

Run the application - A swagger page should show.

Step 2)
Open PostMan
Click new request:  type: https://localhost:7175/api/countries  - This should return the countries data.


***Please note for testing purposes i deployed the API to a personal webserver: http://topglad-001-site9.anytempurl.com/api/Countries


***************************************************************************
FRONTEND: 
***************************************************************************
The front-end is a react solution and under the frontend folder.

Open nodejs command prompt - browse to the frontend folder on your pc.  
type: npm install  - this will install dependencies
then type: npm run dev

U can now browse from any browser to:  http://localhost:5173/


***Please note a file in the frontend main folder is called vite.config - in target: is where the API is deployed.  (Currently pointing to deployed version: http://topglad-001-site9.anytempurl.com/ )


***************************************************************************
TESTS:
***************************************************************************
to run tests in front-end: npx vitest --globals
to run tests in backend:  Open .NET Test explorer - click on run tests.



***************************************************************************
WORKFLOWS:
***************************************************************************
The workflows folder contain the .yml file 

What This Workflow Does
Frontend Job:

Checks out the repository code.

Sets up Node.js environment.

Installs frontend dependencies located in the Frontend/ directory.

Runs tests using Vitest.

Backend Job:

Checks out the repository code.

Sets up the .NET environment.

Restores backend dependencies located in the Backend/BackEndApi/ directory.

Builds the backend project.

Runs backend tests.
