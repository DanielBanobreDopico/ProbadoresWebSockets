<script>

    var chatMessages = [];
    var msg = '';
    var ownId = '';

    const url = 'ws://192.168.5.240:3000/'
    const connection = new WebSocket(url)
    connection.onopen = () => {
        console.log('*** Conectado ***')
    }

    function send(txt){
        connection.send(txt)
    }

    connection.onmessage = msg => {
        if (! ownId) {
            ownId = msg.data;
            console.log(`My ID: ${ownId}`);
        } else {
            var msgJSON = msg.data;
            var message = JSON.parse(msgJSON);
            console.log(message)
            chatMessages = [...chatMessages, message];
        }
    }
</script>

<main>
    <div>
        {#each chatMessages as msg}
        {#if msg.from == ownId}
        <div class="me">
            <img src="https://api.adorable.io/avatars/50/{msg.from}.png">
            <p>{msg.content}</p>
        </div>
        {:else}
        <div class="others">
            <img alt="avatar" src="https://api.adorable.io/avatars/50/{msg.from}.png">
            <p>{msg.content}</p>
        </div>
        {/if}

        {/each}
    </div>
    <div id="input">
        <input type="text" bind:value={msg}>
        <button on:click={send(msg)}>Send</button>
    </div>
</main>

<style>
    div.me {
        background-color: darkgray;
        text-align: right;
    }
    div.others {
        background-color:peru;
    }
    div#input {
        position: fixed;
        bottom: 0px;
    }
</style>