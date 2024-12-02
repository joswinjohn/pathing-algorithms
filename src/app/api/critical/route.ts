import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const reqbody = await request.json();

    const data = reqbody.data;

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
          matrix: ret_data
        }
    })
}

function compute(matrix: number[][]) {
    const numVertices = matrix.length;

    const inDegree = Array(numVertices).fill(0);
    for (let i = 0; i < numVertices; i++) {
        for (let j = 0; j < numVertices; j++) {
            if (matrix[i][j] > 0) {
                inDegree[j]++;
            }
        }
    }

    const topOrder: number[] = [];
    const queue: number[] = [];

    for (let i = 0; i < numVertices; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    while (queue.length > 0) {
        const current = queue.shift()!;
        topOrder.push(current);

        for (let i = 0; i < numVertices; i++) {
            if (matrix[current][i] > 0) {
                inDegree[i]--;
                if (inDegree[i] === 0) queue.push(i);
            }
        }
    }

    if (topOrder.length !== numVertices) {
        return "Graph contains closed path"
    }

    const earliest = Array(numVertices).fill(0);
    for (const u of topOrder) {
        for (let v = 0; v < numVertices; v++) {
            if (matrix[u][v] > 0) {
                earliest[v] = Math.max(earliest[v], earliest[u] + matrix[u][v]);
            }
        }
    }

    const latest = Array(numVertices).fill(Number.MAX_SAFE_INTEGER);
    latest[numVertices - 1] = earliest[numVertices - 1];
    for (let i = topOrder.length - 1; i >= 0; i--) {
        const u = topOrder[i];
        for (let v = 0; v < numVertices; v++) {
            if (matrix[u][v] > 0) {
                latest[u] = Math.min(latest[u], latest[v] - matrix[u][v]);
            }
        }
    }

    const criticalPath: number[] = [];
    for (let i = 0; i < numVertices; i++) {
        if (earliest[i] === latest[i]) criticalPath.push(i);
    }

    return criticalPath;
}