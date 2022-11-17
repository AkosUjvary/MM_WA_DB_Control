<script lang="ts">
	import Table from "./components/Table.svelte";
	import type { ITable, IProcessInfo } from "./types";
	import { service } from "./service";
    import FileList from "./components/FileList.svelte";
	import { onMount } from 'svelte';

	let userInfo = undefined;

	onMount(async () => (userInfo = await getUserInfo()));

	async function getUserInfo() {
		try {
			const response = await fetch('/.auth/me');
			const payload = await response.json();
			const { clientPrincipal } = payload;
			return clientPrincipal;
		} catch (error) {
			console.error('No profile could be found');
			return undefined;
		}
	}


	let parametersTable: ITable = { rows: [], keys: [] };
	let selectedTable: ITable = { rows: [], keys: [] }
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
	
	let currentFolder: string
	function loadFiles(folderMap) {
		service.listfiles(folderMap).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    files = result;
					currentFolder = folderMap.folder
                });
            }
        });
	}

	function load() {
		loadParameters();
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
		{#if userInfo}
		<div class="user">
		<p>Welcome</p>
		<p>{userInfo && userInfo.userDetails}</p>
		<p>{userInfo && userInfo.identityProvider}</p>
		</div>
		{/if}
		<h3>MM DB LOADER control panel</h3>
		<h4>Edit Parameters:</h4>
		<div class="paramButton" on:click={save}>Save</div>
		<div class="paramButton" on:click={load}>Load</div>
	</div>
	<div id="container_2">
		<Table data={parametersTable} />
	</div>

	<div id="container_3"><h4>View Files:</h4></div>
	<div id="container_4">
		<div id="container_4_1">
			<table class="table">
				<thead>
					<tr><th class="header-label">Folders</th></tr>
				</thead>				
				<tr><td><div on:click={() => loadFiles({"folder": "load_to_DB"})}>Load to DB</div></td></tr>
				<tr><td><div on:click={() => loadFiles({"folder": "logs"})}>Logs</div></td></tr>
				<tr><td><div on:click={() => loadFiles({"folder": "output/biased_list"})}>Output / Biased List</div></td></tr>
				<tr><td><div on:click={() => loadFiles({"folder": "output/filmlist_imdbid"})}>Output / Imdb List</div></td></tr>
				<tr><td><div on:click={() => loadFiles({"folder": "output/filmlist_omdb"})}>Output / Omdb List</div></td></tr>				
			</table>
		</div>
		<FileList files={files} folder={currentFolder} bind:selectedTable={selectedTable}></FileList>
	</div>
	<div id="container_5" />
	<div id="container_6">
		<Table data={selectedTable} />
	</div>

	<div id="container_7">MM - 2022</div>
	Dezsőkém
</div>
