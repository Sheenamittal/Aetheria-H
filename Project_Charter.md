# Aetheria-H: Project Charter & Research Plan
_Last Updated: July 28, 2025_

---

### 1. Research Question

**Primary Question:** How do different, targeted public health intervention strategies (e.g., information campaigns vs. movement restrictions) affect the dual contagion of a pathogen and related misinformation within a hyper-local, data-sparse context?

**Secondary Question:** Can a hybrid agent-based model provide more actionable insights for local administrators than traditional epidemiological models?

---

### 2. Hypothesis

**H1:** A targeted information campaign, deployed mid-simulation to agents identified as "misinformation spreaders," will be more effective at lowering the infection peak than a general, untargeted movement restriction applied to the entire population.

---

### 3. Scope Definition

#### **IN SCOPE (Phase 1 & 2):**
-   **Modeling Area:** Rewari District, Haryana.
-   **Agent Type:** 100% Rule-Based Agents. Their behavior is a function of their state, neighbors' states, and information received.
-   **Core Model:** Dual Contagion (Pathogen + Information Bit).
-   **Social Graph:** Generated based on geography (proximity) and household/workplace structures.
-   **Visualization:** Web-based dashboard to view the results of **pre-computed, offline** simulation runs.
-   **Data:** Grounded in 2011 Census data and public geospatial data.

#### **OUT OF SCOPE (Future Work):**
-   **NO LLM-powered agent brains.**
-   **NO real-time simulation in the browser.**
-   **NO complex economic modeling.**
-   **NO modeling of agent memory or learning beyond simple state changes.**

---

### 4. Tech Stack

-   **Frontend:** Next.js, Mapbox GL JS, Recharts
-   **Backend & Simulation:** Python 3.11+ (FastAPI)
-   **Core Libraries:** Mesa (Agent-Based Modeling), GeoPandas (Geospatial), NetworkX (Graphs)
-   **Database:** PostgreSQL 16 + PostGIS 3.4

---

### 5. Data Checklist

-   [ ] **Geospatial:** Rewari District Shapefile (`.shp`).
-   [ ] **Geospatial:** Rewari Tehsil/Sub-district Boundaries Shapefile (`.shp`).
-   [ ] **Geospatial:** Village/Town center point data (lat/lon).
-   [ ] **Demographic:** District Census Handbook (PDF) for Rewari, 2011.
-   [ ] **Demographic:** Village-level population & household data (extracted from PDF/CSV).