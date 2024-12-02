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

    let ret_data = compute(data);
    console.log(ret_data);

    return NextResponse.json({
        message: "sigma", 
        data: {
          path: ret_data[0], 
          weight: ret_data[1]
        }
    })
}

interface Edge {
    vert_1: number;
    vert_2: number;
}

function edge_contains(edge: Edge, value: number) {
    if (edge.vert_1 == value || edge.vert_2 == value) {
        return true;
    } else {
        return false;
    }
}

function completes_circut(map: Map<number, number>, edge: Edge) {
    map.set(edge.vert_1, (map.get(edge.vert_1) ?? 0) + 1)
    map.set(edge.vert_2, (map.get(edge.vert_2) ?? 0) + 1)
    for (let [vert, deg] of map) {
        if (deg == 1) {
            map.set(edge.vert_1, (map.get(edge.vert_1) ?? 0) - 1)
            map.set(edge.vert_2, (map.get(edge.vert_2) ?? 0) - 1)
            return false;
        }
    }
    map.set(edge.vert_1, (map.get(edge.vert_1) ?? 0) - 1)
    map.set(edge.vert_2, (map.get(edge.vert_2) ?? 0) - 1)
    return true;
}

function compute(matrix: number[][]) {
    let map = new Map<Edge, number>();
    let degree_map = new Map<number, number>();
    let path_taken = new Map<Edge, number>();
    let total_weight = 0;
    
    const n_verts = matrix.length;

    for (let i = 0; i < n_verts; i++) {
        console.log(matrix[i]);
        for (let j=i+1; j < matrix[i].length; j++) {
            const edge: Edge = {
                vert_1: i,
                vert_2: j,
            }
            map.set(edge, matrix[i][j]);
        }
    }

    console.log(map, map.size)

    while (path_taken.size < n_verts-1) {
        let min = Infinity;
        let edge: Edge = {
            vert_1: -1,
            vert_2: -1,
        }

        for (let [key, value] of map) {
            if (value < min) {
                min = value;
                edge = key;
            }
        }

        console.log(map.size, edge.vert_1, edge.vert_2, map.get(edge))

        if (edge.vert_1 == -1 || edge.vert_2 == -1) {
            console.log("borken")
            throw new Error('not okay');
        }

        let vert_1_deg = degree_map.get(edge.vert_1)!;
        let vert_2_deg = degree_map.get(edge.vert_2)!;

        if (!vert_1_deg) vert_1_deg = 0;
        if (!vert_2_deg) vert_2_deg = 0;

        console.log("Degrees:", edge.vert_1, ":", vert_1_deg, " , ", edge.vert_2, ":", vert_2_deg)

        if ((vert_1_deg! < 2) && (vert_2_deg! < 2)) {
            console.log("degree map BE", degree_map, path_taken.size, n_verts)
            if (!completes_circut(degree_map, edge)) {
                console.log("Does not complete circut")
                total_weight += min;
                degree_map.set(edge.vert_1, vert_1_deg!+1)
                degree_map.set(edge.vert_2, vert_2_deg!+1)
                path_taken.set(edge, min);
            } else {
                console.log("Completes circut")
            }
            console.log("degree map AF", degree_map, path_taken.size, n_verts)
            
            console.log(path_taken);
        }

        console.log("deleted", edge)
        map.delete(edge);
    }


    let verts: number[] = [];

    for (let [key, value] of degree_map) {
        if (value == 1) {
            verts.push(key);
        }
    }

    console.log(degree_map, verts)
    console.log(map)

    let final_path: number[] = [];
    let current_vert: number = 0;

    for (let [key, value] of map) {
        if (((key.vert_1 == verts[0]) && (key.vert_2 == verts[1])) || ((key.vert_1 == verts[1]) && (key.vert_2 == verts[0]))) {
            total_weight += value;
            final_path.push(verts[0])
            current_vert = verts[1]
            console.log ("find me", verts)
        }
    }

    console.log("BE", path_taken, final_path);

    //console.log("AF", path_taken);

    while (final_path.length < n_verts) {
        for (let [edge, weight] of path_taken) {
            if (edge_contains(edge, current_vert)) {
                console.log(path_taken, (edge.vert_1 == current_vert) ? edge.vert_2 : edge.vert_1, current_vert)
    
                final_path.push(current_vert);
                current_vert = (edge.vert_1 == current_vert) ? edge.vert_2 : edge.vert_1;
                path_taken.delete(edge);
                break;
            } 
        }
        console.log(final_path)
    }

    final_path.push(current_vert);

    return [final_path, total_weight]
}