<script lang="ts">
    export let files = [];
</script>

<div>
    <div id="container_4_1">
        <table class="table">
            <thead>
                <tr><th class="header-label">Folders</th></tr>
            </thead>
            <tr><td>Load to DB</td></tr>
            <tr><td>Logs</td></tr>
            <tr><td>Output / Biased List</td></tr>
            <tr><td>Output / Imdb List</td></tr>
            <tr><td>Output / Omdb List</td></tr>
        </table>
    </div>
    <div id="container_4_2">
        <table class="table">
            <thead>
                <tr><th class="header-label">Files</th></tr>
            </thead>
            {#each files as file}
                <tr><td>{file.name}</td></tr>
            {/each}
        </table>
    </div>
</div>
