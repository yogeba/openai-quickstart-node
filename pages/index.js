import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [healthInput, setHealthInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ health: healthInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      let results;
      if (Array.isArray(data.result)) {
      results = data.result;
      } else {
      results = JSON.parse(data.result);
      }

      const elements = results.map((item, index) => {
        return (
        <div key={index}>
          <h4>{item.Question}</h4>
          <p>{item.Answer}</p>
        </div>
        )
      })

      setResult(elements);
      setHealthInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  }

  

  return (
    <div>
      <Head>
        <title>Supplement Search</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Search my Supplement</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="health"
            placeholder="Enter an health condition, symptom, disease or outcome"
            value={healthInput}
            onChange={(e) => setHealthInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>
  );
}