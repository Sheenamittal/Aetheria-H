# Aetheria-H: An Agent-Based Epidemic Simulator

Aetheria-H is a full-stack web application designed to simulate the spread of infectious diseases through a hyper-local, agent-based model. Calibrated using real-world census data for the Rewari district in Haryana, India, this platform serves as a powerful tool for public health research, policy testing, and understanding the complex dynamics of a pandemic.

The project's primary goal is to create a "digital twin" of a real-world population and use it as a sandbox to run experiments that would be impossible in real life. It moves beyond traditional equation-based models by simulating the interactions of hundreds of thousands of individual agents, each with their own state and location, allowing for the emergence of complex, system-wide behavior.

## Project Flowchart
This flowchart illustrates the entire data and application pipeline, from raw data acquisition to the final interactive visualization.

```
graph TD
    subgraph "Phase 1: Data Acquisition & Preparation"
        A[Start: Data Hunt] --> B(Download Geospatial Data<br/>GADM Shapefiles);
        A --> C(Download Census Data<br/>Govt. of India PDF Handbooks);
        B --> D{Data Extraction & Cleaning<br/>(Jupyter Notebook w/ GeoPandas)};
        C --> E{Data Extraction & Cleaning<br/>(Jupyter Notebook w/ Camelot)};
        D --> F[rewari_boundary.geojson];
        E --> G[rewari_village_population_2011.csv];
        G --> H{Geocoding Script<br/>(Python w/ geopy)};
        H --> I[rewari_villages_geocoded.csv];
    end

    subgraph "Phase 2: Backend Simulation API"
        J(FastAPI Server<br/>main.py) --> K(Simulation Core);
        F --> K;
        I --> K;
        K --> L[Agent Class<br/>(Status: S, I, R)];
        K --> M[World Class<br/>(SIR Logic, Spatial Indexing)];
        M --> N(API Endpoint<br/>/run_simulation);
    end

    subgraph "Phase 3: Frontend Control Panel"
        O(Next.js/React App<br/>page.js) --> P{User Interface};
        P --> Q[Parameter Sliders<br/>(Population, Radius, etc.)];
        P --> R[Run Simulation Button];
        R -- onClick --> S(API Request to Backend);
        S --> N;
        N -- JSON Response --> S;
        S --> T{Visualization<br/>(Recharts)};
        T --> U(Display Epidemic Curve Graph);
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style U fill:#ccf,stroke:#333,stroke-width:2px
```

## Key features
- Data-Driven World Generation: The simulation environment is built from the ground up using official 2011 Census data for population figures and GADM data for geographical boundaries, ensuring a realistic population distribution.

- Agent-Based Modeling (ABM): Simulates a population of over 600,000 individual agents, each with a health status (Susceptible, Infected, or Recovered) based on the classic SIR epidemiological model.

- Spatial Transmission: The spread of disease is not random; it's based on the geographic proximity of agents, calculated efficiently using a k-d tree spatial index.

- Interactive Control Panel: A web-based frontend built with Next.js and React allows users to control simulation parameters like population size, infection radius, and transmission probability.

- Dynamic Visualization: The results of the simulation, including the classic S-I-R epidemic curve, are plotted in real-time using Recharts.

- Full-Stack Architecture: A robust backend built with Python and FastAPI serves the simulation results to a modern, responsive frontend.


## Tech Stack
- Backend: Python, FastAPI, Camelot-py (for data extraction), GeoPandas, NumPy, SciPy.

- Frontend: JavaScript, Next.js, React, Tailwind CSS, Recharts.

- Database/Data: PostgreSQL + PostGIS (for geospatial data), CSV.

- DevOps: Virtual Environments (venv), npm.


## Project Structure
```
Aetheria-H/
├── backend/
│   ├── venv/                 # Python Virtual Environment
│   ├── main.py               # FastAPI application
│   ├── 01_data_extraction.ipynb # Notebook for PDF data extraction
│   └── 02_simulation_skeleton.ipynb # Notebook for building and testing the model
├── frontend/
│   ├── src/
│   │   └── app/
│   │       └── page.js       # Main React component for the UI
│   ├── package.json
│   └── ...
├── data/
│   ├── demographics/         # Raw census PDFs
│   ├── geospatial/           # Raw shapefiles
│   ├── rewari_boundary.geojson
│   └── rewari_village_population_2011.csv
└── README.md                 # This file

```


