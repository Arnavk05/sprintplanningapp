**Sprint Planning Web App**

This is a SCRUM Sprint Planning App that allows you to generate a fully-functional sprint plan utilizing the OPENAI API. Upload two spreadsheets, one with developer details (including name, area of expertise, and days available), and one with a list of user stories ranked by prority. After selecting the sprint length, the app will generate a fully customized plan that divides up tasks based on each developer, fitted to their areas of expertise, experience, days available, task complexity, etc.

Sample Excel sheets are provided in the /excel folder above.


<img width="1065" alt="Screen Shot 2024-09-10 at 12 33 29 PM" src="https://github.com/user-attachments/assets/e4688aa6-a54f-4f9a-807e-562955ccbde7">


**Installation:** 

1) To start, install dependencies with npm install and setup the .env with you OPENAI API key.
2) Open two terminals, in one run 'node server.js'
3) In the other run 'cd client' and 'npm start' and press yes when prompted.
4) Upload excel sheets and enter sprint length.
5) Press Upload, wait a few seconds, and your sprint plan will be generated.
