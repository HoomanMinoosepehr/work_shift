# work shift
### Version: v1.0.0
## Frameworks: 
- Back-End: Ruby on Rails
- Front-End: React.js
- Database: PSQL

## Introduction
"WorkShift" is an application designed for companies with part-time employees who require shift assignments. With this application, the company owner can appoint managers to oversee employees, or they can personally manage the employees. Additionally, both managers and the company owner have the capability to add or remove employees from the company and assign shifts to them.

## How to run:
This application is dockerized, so to run the application, after cloning the repo, make sure that you are at the root directory(where the docker-compose file is placed), run this command on your terminal "docker-compose build" and after creating images, using command "docker compose run" run the containers and afterward by going to 'localhost:5050' on your browser, you can enter the application.

## How to test:
Use this link: http://work-shift.onrender.com/

## Users
There are 3 types of users:

#### Owner:
The owner has the main account of the applcation and the can add managers or employees by creating account for them or assign shifts to their employees, also they can remove who ever they want.

#### Manager:
Managers are added by the owner to the company and after joining the company the can sign-in and manage the employees (add or remove by creating or deleting their account) and also assigning shifts to them.

#### Employees:
Employees are added by the managers or the owner and after signing-in they can see their upcomming shifts for the next 10days.


## Different sections:

#### Manager section:
Access to this section is exclusive to the owner, who can view a list of their managers. By clicking on each manager, additional details become available. Furthermore, the owner has the ability to edit certain manager information, such as their first name, last name, or email address, as well as the option to delete any manager as needed.

#### Employee section:
This section functions similarly to the manager's part, with both managers and the owner having access. Here, they can add, remove, or edit employees within the company.

#### Shifts section:
This section is dedicated to assigning shifts to employees, accessible by managers and the owner. On this page, there is a calendar where you can pick a date, select an employee from your company, and specify the start and end times for their shift. Afterward, you can save the assigned shift.
    Additionally, when selecting a date on the calendar, not only can you set shifts for each employee on that date, but you can also view previously assigned shifts and delete them.

#### Schedule section:
This section is only accessible by the emplyees ang by going there they can see their upcomming shifts for the next 10days.

#### Account section:
Every user has access to this page, where they can view and edit their personal information, including the option to change their password. Changing the password is essential for this application, as users do not create their accounts themselves. After the initial sign-in, they are required to update their password.

 ## Back-end:
 On the back-end we have 4 different tables, one for companies, one for managers, one for employees, one for shifts and one for web-site admins.
- Companies and managers and employees each has these columns:
    1) first name
    2) last name
    3) email
    4) password

- Shifts table has these columns:
    1) date
    2) start time
    3) end time

- companies table has on to many relation with the bellow tables:
    1) managers
    2) employees
    3) shifts

- also, there is a one to many relation between employees table and shifts table.
