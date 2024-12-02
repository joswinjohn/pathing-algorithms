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
  
function findParent(parent: number[],component: number) : number { 
    if(parent[component]==component) {
        return component;
    } else {
        return parent[component] = findParent(parent,parent[component]);
    }
} 

function compute(matrix: number[][]) {
    let edges: number[][] = [];
    let ret_matrix = Array.from({length: matrix.length}, _ => new Array(matrix.length).fill(0));

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[j][i] > 0) {
                edges.push([i, j, matrix[j][i]]);
            }
        }
    }

    edges.sort((a, b) => a[2] - b[2]);
    let n = edges.length;

    let parent: number[] = new Array(n); 
    let rank = new Array(n).fill(0); 
  
    for(let i=0;i<n;i++) { parent[i]=i; } 
  
    let minCost=0;
  
    console.log("Following are the edges in the constructed MST"); 
    for(let i=0;i<n;i++) 
    { 
        let v1 = findParent(parent, edges[i][0]); 
        let v2 = findParent(parent, edges[i][1]); 

        let wt = edges[i][2]; 
  
        if(v1 != v2) { 
            v1=findParent(parent,v1); 
            v2=findParent(parent,v2); 
        
            if(rank[v1] < rank[v2]) { 
                parent[v1] = v2; 
            } else if(rank[v1] < rank[v2]) { 
                parent[v2] = v1; 
            } else { 
                parent[v2] = v1; 
                rank[v1]++;
            } 

            minCost+=wt; 
            console.log(edges[i][0] + " -- " + edges[i][1] + " == " + wt);

            ret_matrix[edges[i][0]][edges[i][1]] = wt;
            ret_matrix[edges[i][1]][edges[i][0]] = wt;
            console.log(ret_matrix)
        }
    } 
    
    console.log(ret_matrix);
    console.log(ret_matrix[0][2])
    console.log("Minimum Cost Spanning Tree:", minCost); 
    
    return ret_matrix
}