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

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
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
        );
      });

      setResult(elements);
      setHealthInput("");
    } catch (error) {
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
        <div className={styles.result}>{result}</div>
      </main>
      <a
        target="_blank"
        href="https://www.amazon.in/dp/B01DQV8BIM?ref=nb_sb_ss_w_as-reorder-t1_k0_1_5&amp;amp=&amp;crid=3OWGXHNXRNVI3&amp;sprefix=ashwa&amp;th=1&_encoding=UTF8&tag=examine0b-21&linkCode=ur2&linkId=2bf50aa798fc8c91cd1effa0fb7ddd3d&camp=3638&creative=24630"
      >
        ash
      </a>
    </div>
  );
}
