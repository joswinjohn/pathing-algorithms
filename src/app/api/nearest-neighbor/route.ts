import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const reqbody = await request.json();

    const data = reqbody.data;
    const start_vert = reqbody.start_vert;

    if (!Array.isArray(data)) {
        return NextResponse.json(
          { error: "Invalid input: 'data' should be an array." },
          { status: 400 }
        );
    }

    let ret_data = compute(data, start_vert);
    console.log(ret_data);

    return NextResponse.json({
        message: "sigma", 
        data: {
          path: ret_data.path_taken, 
          weight: ret_data.weight
        }
    })
}

function compute(matrix: number[][], start_vert: number) {
    const n_nodes = matrix.length;
    let visited = new Array(n_nodes).fill(false);
    let path_taken = new Array().fill(false);
    
    visited[start_vert] = true;
    path_taken.push(start_vert);

    let current_vert = start_vert;
    let weight = 0;

    for (let i = 1; i < n_nodes; i++) {
        let closest_neighbor = -1;
        let closest_neighbor_weight = Infinity;
    
        for (let neighbor = 0; neighbor < n_nodes; neighbor++) {
          if (!visited[neighbor] && matrix[current_vert][neighbor] < closest_neighbor_weight) {
            closest_neighbor = neighbor;
            closest_neighbor_weight = matrix[current_vert][neighbor];
          }
        }
    
        if (closest_neighbor !== -1) {
          visited[closest_neighbor] = true;
          path_taken.push(closest_neighbor);
          weight += closest_neighbor_weight;
          current_vert = closest_neighbor;
        }
    }

    weight += matrix[current_vert][start_vert];
    path_taken.push(start_vert);

    return { path_taken, weight };
}