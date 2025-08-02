from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from scipy.spatial import cKDTree
import pandas as pd

# --- SIMULATION PARAMETERS ---
RECOVERY_DURATION = 14
INITIAL_INFECTIONS = 10
SIMULATION_DAYS = 150
# We'll get population, radius, and probability from the user

# --- Agent Class ---
class Agent:
    def __init__(self, agent_id, x, y):
        self.id = agent_id; self.x = x; self.y = y
        self.status = 'S'; self.infection_timer = 0

# --- World Class (Simplified for API) ---
class World:
    def __init__(self, population, infection_radius, infection_probability):
        self.agents = []
        self.history = []
        self.day = 0
        self.population = int(population)
        self.infection_radius = infection_radius
        self.infection_probability = infection_probability

    def populate(self):
        # Simplified placement for speed in the API
        coords = np.random.rand(self.population, 2)
        for i in range(self.population):
            self.agents.append(Agent(i, coords[i,0], coords[i,1]))

    def seed_infection(self, num_infections):
        infected_indices = np.random.choice(len(self.agents), num_infections, replace=False)
        for i in infected_indices:
            self.agents[i].status = 'I'
            self.agents[i].infection_timer = RECOVERY_DURATION

    def tick(self):
        # (The tick logic is the same as before)
        infected_agents = [a for a in self.agents if a.status == 'I']
        if not infected_agents: return
        for agent in infected_agents:
            agent.infection_timer -= 1
            if agent.infection_timer <= 0: agent.status = 'R'
        susceptible_agents = [a for a in self.agents if a.status == 'S']
        if not susceptible_agents: return
        susceptible_coords = np.array([[a.x, a.y] for a in susceptible_agents])
        susceptible_tree = cKDTree(susceptible_coords)
        newly_infected_ids = set()
        for agent_i in infected_agents:
            if agent_i.status != 'I': continue
            nearby_indices = susceptible_tree.query_ball_point([agent_i.x, agent_i.y], self.infection_radius)
            for index in nearby_indices:
                agent_s = susceptible_agents[index]
                if agent_s.id not in newly_infected_ids and np.random.rand() < self.infection_probability:
                    newly_infected_ids.add(agent_s.id)
        for agent_id in newly_infected_ids:
            self.agents[agent_id].status = 'I'
            self.agents[agent_id].infection_timer = RECOVERY_DURATION

    def run_simulation(self, days):
        self.populate()
        self.seed_infection(INITIAL_INFECTIONS)
        for day in range(days):
            self.tick()
            counts = {'S': 0, 'I': 0, 'R': 0}
            for a in self.agents: counts[a.status] += 1
            self.history.append({**counts, 'day': day})
            if counts['I'] == 0 and day > INITIAL_INFECTIONS: break
        return self.history

# --- API Setup ---
app = FastAPI()

# Allow requests from our frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/run_simulation")
def run_simulation_endpoint(population: int = 10000, radius: float = 0.01, probability: float = 0.05):
    sim_world = World(population=population, infection_radius=radius, infection_probability=probability)
    results = sim_world.run_simulation(days=SIMULATION_DAYS)
    return results