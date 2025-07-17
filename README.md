
🌋 VOLCANOWATCH
────────────────────────────────────────────
     __     __   _     _        _       
     \ \   / /  | |   (_)      | |      
      \ \_/ /__ | |__  _  ___  | |_ ___ 
       \   / _ \| '_ \| |/ _ \ | __/ _ \
        | | (_) | | | | | (_) || ||  __/
        |_|\___/|_| |_|_|\___/  \__\___|
────────────────────────────────────────────
Real-time visualization of seismic and ground deformation data  
from volcanic regions like **Campi Flegrei** and **Etna**.

## 🚀 Project Overview

**VolcanoWatch** is a Node.js + Vue.js powered platform that:

- 🛰️ Fetches real-time **seismic events** and **GPS deformation** data  
- 🗺️ Visualizes it interactively on a **Leaflet map**  
- 📈 Displays alert boxes for **anomalies**  
- 🌐 Offers a 3D **terrain deformation demo** (Three.js)  
- 📡 Built with the potential to assist real-world volcanology efforts  

## 🧩 Tech Stack

| Layer         | Tech             |
| ------------- | ---------------- |
| Frontend      | Vue 3 + Vite     |
| 3D Rendering  | Three.js         |
| Map Layer     | Leaflet.js       |
| Backend       | Node.js + Express|
| Data Sources  | Mock APIs *(WIP → Real)* |
| Deployment    | Docker + Docker Compose |

## 🗂️ Project Structure

```
project-root/
├── frontend/       # Vue app with map + alert UI
│   └── components/ # Vue components (map, alert, 3D)
├── backend/        # Express API for seismic + deformation
├── data/           # Static mock or real data
├── docker-compose.yml
└── README.md
```

## 🐳 Docker Quickstart

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/volcanowatch.git
   cd volcanowatch
   ```

2. **Start all services**  
   ```bash
   docker-compose up --build
   ```

3. **Access the App**  
   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - Backend: [http://localhost:3000/api/seismic/events](http://localhost:3000/api/seismic/events)

## 📊 Features

- **Alert Box**  
  - Triggers when > M3.5 quakes or > 10mm uplift detected
- **Interactive Map**  
  - Plots seismic events and deformation vectors
- **3D Terrain Prototype**  
  - Simulates deformation using Three.js *(experimental)*
- **Modular Architecture**  
  - Ready for real scientific data integration

## 🎯 Goal

This project is an effort to:
- Build a **scientific-grade visual dashboard**
- Bridge **open source tech** and **volcanology research**
- Create a collaboration-ready MVP to support outreach to:
  - INGV (Italy)
  - Vesuvius Observatory
  - Global Volcanic Monitoring Labs

## 🙌 Contributing

Pull requests and feedback are welcome!  
We’re actively looking for collaborators in:
- Volcanology
- GIS / geospatial analysis
- Real-time data streaming
- UI/UX design

## 📬 Contact

Reach out via [GitHub Issues](https://github.com/your-username/volcanowatch/issues)  
or directly at: `your-email@example.com`

## 📜 License

MIT License

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING  
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS  
IN THE SOFTWARE.
```
