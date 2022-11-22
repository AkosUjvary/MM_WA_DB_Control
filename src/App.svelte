<script lang="ts">
	import Table from "./components/Table.svelte";
	import type { ITable, IProcessInfo } from "./types";
	import { service } from "./service";
    import FileList from "./components/FileList.svelte";
	import { onMount } from 'svelte';
    import { xlink_attr } from "svelte/internal";

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


	let editTable: ITable = { rows: [], keys: [] };
	let maxTableID=0;
	let selectedTable: ITable = { rows: [], keys: [] }
	let files = [];

	function loadParameters() {
		service.loadParam().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					const keys =["editor_row_id"].concat(Object.keys(result[0]));
					let rowsWithID = [...result];
					for (var i in rowsWithID){
						rowsWithID[i]=Object.assign({}, {"editor_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
					}
					editTable = { rows: rowsWithID, keys: keys };
					maxTableID=editTable.rows.length;
				});
			}
		});
	}

	function loadMapping() {
		service.loadMapping().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					const keys =["editor_row_id"].concat(Object.keys(result[0]));
					let rowsWithID = [...result];
					for (var i in rowsWithID){
						rowsWithID[i]=Object.assign({}, {"editor_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
					}
					editTable = { rows: rowsWithID, keys: keys };
					maxTableID=editTable.rows.length;
				});
			}
		});
	}

	function newRow(){
		let maxTableID=Math.max(...editTable.rows.map(x=>parseInt(x["editor_row_id"])));
		let emptyRow={...editTable.rows[0]};
		for (var key in emptyRow){
			if (key=="editor_row_id"){
				maxTableID++;
				emptyRow[key]=(maxTableID).toString()
			}
			else
			emptyRow[key] = ""
		}
		editTable.rows.push(emptyRow);
		editTable=editTable;
	}


	let currentFolder: string
	function loadFiles(folder_nm) {
		service.listfiles({"folder" : folder_nm}).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    files = result;
					currentFolder = folder_nm
                });
            }
        });
	}

	function load(table) {
		if (table=="parameter"){
			loadParameters();
		}
		else if (table=="mapping") {
			loadMapping();
		}
	}

	function saveParam() {
		let saveTable={...editTable}
		saveTable.keys=saveTable.keys.splice(1,saveTable.keys.length)
		for (var i in saveTable.rows){
					delete saveTable.rows[i].editor_row_id
			}

		service.saveParam(JSON.stringify(editTable.rows)).then((response) => {
			if (response.ok) {
				alert("Mentés sikeres!");
			}
		});
	}

	function saveMapping() {
		let saveTable={...editTable}
		saveTable.keys=saveTable.keys.splice(1,saveTable.keys.length)
		for (var i in saveTable.rows){
					delete saveTable.rows[i].editor_row_id
			}

		service.saveMapping(JSON.stringify(editTable.rows)).then((response) => {
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
		<p>Welcome {userInfo && userInfo.userDetails} ({userInfo && userInfo.identityProvider})</p>
		</div>
		{/if}
		<h3>MM DB LOADER control panel</h3>
		<h4>Edit Parameters:</h4>
		<div class="paramButton" on:click={saveParam}>Save P</div>
		<div class="paramButton" on:click={() => load("parameter")}>Load P</div>

		<div class="paramButton" on:click={saveMapping}>Save M</div>
		<div class="paramButton" on:click={() => load("mapping")}>Load M</div>

		<div class="paramButton" on:click={newRow}>New row</div>

	</div>
	<div id="container_2">
		<Table bind:data={editTable} rowType="edit"/>
	</div>

	<div id="container_3"><h4>View Files:</h4></div>
	<div id="container_4">
		<div id="container_4_1">
			<table class="table">
				<thead>
					<tr><th class="header-label">Folders</th></tr>
				</thead>				
				<tr><td><div class="td_Sel" on:click={() => loadFiles("load_to_DB")}>Load to DB</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("logs")}>Logs</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/biased_list")}>Output / Biased List</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/filmlist_imdbid")}>Output / Imdb List</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/filmlist_omdb")}>Output / Omdb List</div></td></tr>				
			</table>
		</div>
		<FileList bind:files={files} bind:folder={currentFolder} bind:selectedTable={selectedTable}></FileList>
	</div>
	<div id="container_5" />
	<div id="container_6">
		<Table data={selectedTable} rowType="view" />
	</div>

	<div id="container_7">MM - 2022</div>
	Dezsőkém
</div>
