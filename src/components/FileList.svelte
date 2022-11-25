<script lang="ts">
    import { component_subscribe } from "svelte/internal";
    export let folder = "";
    export let rowType = "";
    export let files = [];
    export let selectedTable: ITable;
    
    import { service } from "../service";
    import type { ITable, IProcessInfo } from "../types";



    function viewFiles(file) {        
        service.view({"file": file}).then((response)=>{
            if(response.ok){
                response.json().then((result) => {

                    if (file==="load_to_DB/load_filmlist_to_db"){
                        rowType="corr";
                        const keys =["corr_row_id"].concat(Object.keys(result[0]));
                        let rowsWithID = [...result];
                        for (var i in rowsWithID){
                            rowsWithID[i]=Object.assign({}, {"corr_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
                        }
                        selectedTable = { rows: rowsWithID, keys: keys };
                    } 
                    else {
                        rowType="view";
                        const keys=Object.keys(result[0]);
                        selectedTable={ rows:result, keys:keys }
                    }
                })
            }
        })
    }

    function deleteBlob(file) {
        
        if(file.toString()!="load_to_DB/stage_mapping"){
        service.deleteBlob({"file": file}).then((response)=>{
            if(response.ok){
                alert("Törlés sikeres! ("+file.toString()+")")
                loadFiles(folder)
            }            
        })
        }
        else
        alert("Nem törölhető! ("+file.toString()+")")      
    }

    function loadFiles(folder_nm) {
		service.listfiles({"folder" : folder_nm}).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    files = result;
					folder = folder_nm
                });
            }
        });
	}
    
</script>
<div>
    
    <div id="container_4_2">
        <table class="table">
            <thead>
                <tr><th class="header-label"></th><th class="header-label">Files</th></tr>
            </thead>
            {#each files as file}
                <tr>
                    <td><div class="td_Del" on:click={() => deleteBlob(`${folder}/${file}`)}>-</div></td>
                    <td><div class="td_Sel" on:click={() => viewFiles(`${folder}/${file}`)}>{file}</div></td>
                </tr>
            {/each}
        </table>
    </div>
</div>
