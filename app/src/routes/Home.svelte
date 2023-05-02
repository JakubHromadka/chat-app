<script lang="ts">
    import { navigate } from "svelte-navigator";

    let name: string;

    const login = async () => {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
            }),
        });
        const data = await res.json();

        if (data.id) {
            localStorage.setItem("id", data.id);
            navigate("/chat", { replace: true });
        }
    };
</script>

<form on:submit|preventDefault={login}>
    <input type="text" placeholder="meno" required bind:value={name} />
    <input type="submit" value="Join Chat" />
</form>
