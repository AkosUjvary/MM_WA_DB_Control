
<script lang="ts">
    export let folder = "";
    export let files = [];
    export let selectedTable: ITable;
    import { service } from "../service";
    import type { ITable, IProcessInfo } from "../types";



    function viewFiles(file) {
        service.view(file).then((response)=>{
            if(response.ok){
                response.json().then((result) => {
                    const keys=Object.keys(result[0]);
                    selectedTable={ rows:result, keys:keys }
                })
            }
        })
    }
</script>
<div>
    
    <div id="container_4_2">
        <table class="table">
            <thead>
                <tr><th class="header-label">Files</th></tr>
            </thead>
            {#each files as file}
                <tr><td><div on:click={() => viewFiles({"file": `${folder}/${file}`})}>{file}</div></td></tr>
            {/each}
        </table>
    </div>
</div>
