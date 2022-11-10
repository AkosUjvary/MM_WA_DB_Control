<script lang="ts">
	import ParamTable from "./components/ParamTable.svelte";
	import type { IParamTable, IProcessInfo } from "./types";
	import ProcessInfoTable from "./components/ProcessInfoTable.svelte";
	import { service } from "./service";
    import FileList from "./components/FileList.svelte";

	let parametersTable: IParamTable = { rows: [], keys: [] };
	let processInfos: IProcessInfo[] = [];
	let files = [];

	function loadParameters() {
		service.load().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					const keys = Object.keys(result[0]);
					parametersTable = { rows: result, keys: keys };
				});
			}
		});
	}

	function loadFiles() {
		service.listfiles().then(response => {
            if (response.ok) {
                response.json().then(result => {
                    files = result;
                });
            }
        });
	}

	function load() {
		loadParameters();
		loadFiles();
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
		<ParamTable data={parametersTable} />
	</div>

	<div id="container_3"><h4>View Files:</h4></div>
	<div id="container_4">
		<FileList {files}></FileList>
	</div>
	<div id="container_5" />
	<div id="container_6">
		<ProcessInfoTable {processInfos} />
	</div>

	<div id="container_7">MM - 2022</div>
</div>
