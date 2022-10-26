<script lang="ts">
    import ParamTable from "./components/ParamTable.svelte";
	import type { IParamTable, IProcessInfo } from "./types";
    import ProcessInfoTable from "./components/ProcessInfoTable.svelte";
    import { service } from "./service";
	
	let parametersTable: IParamTable = {rows: [], keys: []};
	let processInfos: IProcessInfo[] = [];

	function load() {
		service.load().then(
			(response) => {
				if (response.ok) {
					response.json().then((result) => {
						const keys = Object.keys(result[0]);
						parametersTable = {rows: result, keys: keys};
					});
				}
			}
		);
	}

	function save() {
		service.save(JSON.stringify(parametersTable.rows)).then((response) => {
			if (response.ok) {
				alert("Mentés sikeres!");
			}
		});
	}

</script>

<div id="main">
	<div id="container_1">
		<h3>MM DB LOADER control panel</h3>
		<h4>Edit Parameters:</h4>
		<div class="paramButton" on:click={save}>Save</div>
		<div class="paramButton" on:click={load}>Load</div>
	  
	</div>
	<div id="container_2">
		<ParamTable data={parametersTable}></ParamTable>
	</div>
	

	<div id="container_3"> <h4>View Files: </h4></div>
	<div id="container_4">
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
				<tr><td>filmlist_imdbid_12</td></tr>
				<tr><td>filmlist_imdbid_13</td></tr>
				<tr><td>filmlist_imdbid_999</td></tr>    
			</table>
		</div>
	</div>
	<div id="container_5">  </div>
	<div id="container_6"> 
		<ProcessInfoTable {processInfos}></ProcessInfoTable>	
	</div>
	
	<div id="container_7"> MM - 2022 </div>
</div>
