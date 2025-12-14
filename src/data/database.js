export async function getRenters() {
  try {
    const response = await fetch('http://localhost:3001/api/renters');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching renters:", error);
    return [];
  }
}


export async function getVehicles() {
  try {
    const response = await fetch('http://localhost:3001/api/vehicles');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

export async function getTenants() {
  try {
    const response = await fetch('http://localhost:3001/api/tenants');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
}