<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { io } from "socket.io-client";

    if (!localStorage.getItem("id")) {
        navigate("/", { replace: true });
    }

    const socket = io("http://localhost:3000/");

    let message: string;

    const send = () => {
        socket.send({ message, authorId: localStorage.getItem("id") });
        message = "";
    };

    let messages: { content: string; author: { name: String } }[] = [];

    socket.on("messages", (data) => {
        messages = data;
    });

    socket.on("message", (data) => {
        messages = [...messages, data];
    });
</script>

<form on:submit|preventDefault={send}>
    <input type="text" bind:value={message} />
    <input type="submit" />
</form>

<ul>
    {#each messages as { content, author }}
        <li>{content} ({author.name})</li>
    {/each}
</ul>
