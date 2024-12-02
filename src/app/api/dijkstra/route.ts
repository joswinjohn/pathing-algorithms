import { NextResponse } from "next/server";
import { PriorityQueue } from '@datastructures-js/priority-queue';

export async function POST(request: Request) {
    const reqbody = await request.json();

    const data = reqbody.data;
    const start_vert = reqbody.start_vert;
    const end_vert = reqbody.end_vert;

    if (!Array.isArray(data)) {
        return NextResponse.json(
          { error: "Invalid input: 'data' should be an array." },
          { status: 400 }
        );
    }

    let ret_data = compute(data, start_vert, end_vert);
    console.log(ret_data);

    return NextResponse.json({
        message: "sigma", 
        data: {
          path: ret_data[0], 
          weight: ret_data[1]
        }
    })
}

function compute(matrix: number[][], start_vert: number, end_vert: number) {
    const n_verts = matrix.length;

    let dist = new Array(n_verts);
    let shortest_path_tree = new Array(n_verts);
    let prev = new Array(n_verts);

    prev[start_vert] = -1;
     
    for(let i = 0; i < n_verts; i++)
    {
        dist[i] = Infinity;
        shortest_path_tree[i] = false;
    }
    
    dist[start_vert] = 0;

    for(let count = 0; count < n_verts - 1; count++)
    {
        let min = Infinity;
        let min_index = -1;
        
        for(let v = 0; v < n_verts; v++)
        {
            if (shortest_path_tree[v] == false && dist[v] <= min) 
            {
                min = dist[v];
                min_index = v;
            }
        }

        let u = min_index;
        shortest_path_tree[u] = true;
        
        for(let v = 0; v < n_verts; v++)
        {
            if (!shortest_path_tree[v] && matrix[u][v] != 0 && 
                   dist[u] != Number.MAX_VALUE &&
                   dist[u] + matrix[u][v] < dist[v])
            {
                dist[v] = dist[u] + matrix[u][v];
                prev[v] = u;
                console.log(v, dist[v], u)
            }
        }
    }

    let path: number[] = [];
    let check: number = end_vert;

    while(check != start_vert) {
        path.unshift(check);
        check = prev[check];
    }

    path.unshift(start_vert);

    return [path, dist[end_vert]]
}