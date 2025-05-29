Angular + ASP.NET Core Data Management Project
Single-page Angular application with ASP.NET Core Web API for managing observation data with dynamic forms.
🎯 Features
•	Summary View: Grid display of observation data
•	Detailed View: Dynamic forms based on selected sampling time
•	Web API: ASP.NET Core backend with JSON file storage
•	Navigation: Tab-based view switching

🛠️ Tech Stack
•	Frontend: Angular
•	Backend: ASP.NET Core Web API
•	Data: JSON file storage

🚀 Quick Start
Backend Setup
cd Backend
dotnet restore
dotnet run
# API runs on https": //localhost:7183/api/Observation

Frontend Setup
cd Frontend
npm install
ng serve
# App runs on http://localhost:4200
📊 Data Structure
{
  "Id": 1,
  "Name": "New Observation",
  "Datas": [
    {
      "SamplingTime": "2021-04-21T11:00:05.5051255+05:30",
      "Properties": [
        {
          "Value": "Road Construction 1",
          "Label": "Project Name"
        }
      ]
    }
  ]
}
🔌 API Endpoints
•	GET /api/observations - Get all data
•	POST /api/observations - Create new data
📁 Project Structure
project-root/
├── Frontend/ (Angular)
   └── src/app/
       ├── components/
       ├── services/
       └── models/
Backend/ (ASP.NET Core)
    ├── Controllers/
    ├── Models/
    ├── Services/
    └── Data/data.json
🔧 Git Workflow
# Development branch workflow
git checkout -b development
# Work on features
git checkout main
git merge development
🧪 Testing
# Backend
dotnet test

# Frontend  
cd Frontend && ng test
📦 Build
# Backend
dotnet build --configuration Release

# Frontend
ng build --prod
🎨 Application Views
1.	Summary: Table view of all observation data
2.	Detailed: Select sampling time → Edit properties in dynamic form → Save changes

