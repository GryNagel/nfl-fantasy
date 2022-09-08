import type { Player} from "~/models/players.server";
import { getPlayers, updatePlayer } from "~/models/players.server";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import type { SelectOption } from "~/components/Select";
import Select from "~/components/Select";
import type { FormEvent } from "react";
import FilterLink from "~/components/NavLink";
import { getRoleBackground, getTagBackground } from "~/styles/styleUtils";

const tagOptions: SelectOption[] = [
  { value: "Rookie", label: "Rookie" },
  { value: "Deepsleeper", label: "Deep sleeper" },
  { value: "Sleeper", label: "Sleeper" },
  { value: "Bust", label: "Bust?" },
  { value: "Bargain", label: "Bargain" },
  { value: "Breakout", label: "Breakout" },
  { value: "IR", label: "IR" },
  { value: "Suspension", label: "Suspension" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("role");
  console.log(term);
  const players = await getPlayers(term);
  const sortedPlayers = players.sort((a, b) => a.rank - b.rank);
  return json({ players: sortedPlayers });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const tag = formData.get("tag");
  const string = formData.get("string");
  const note = formData.get("note");
  const id = formData.get("id");

  if (
    tag !== undefined &&
    typeof tag === "string" &&
    id &&
    typeof id === "string"
  ) {
    console.log("tag changed", id);
    await updatePlayer(id, { tag, string: null, note: null });
  }

  if (
    string !== undefined &&
    typeof string === "string" &&
    id &&
    typeof id === "string"
  ) {
    console.log("string changed", id);
    await updatePlayer(id, { string, tag: null, note: null });
  }

  if (
    note !== undefined &&
    typeof note === "string" &&
    id &&
    typeof id === "string"
  ) {
    console.log("string changed", id);
    await updatePlayer(id, { note, tag: null, string: null });
  }

  return null;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();

  function handleChange(event: FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div>
      <h1>NFL Fantasy 2022</h1>
      <div className="flex justify-center">
        <FilterLink to="/">All</FilterLink>
        <FilterLink to="/?role=qb">QB</FilterLink>
        <FilterLink to="/?role=rb">RB</FilterLink>
        <FilterLink to="/?role=wr">WR</FilterLink>
        <FilterLink to="/?role=te">TE</FilterLink>
        <FilterLink to="/?role=dst">DST</FilterLink>
      </div>
      <table>
        <tbody>
          <tr>
            <th> Rank </th>
            <th> Player </th>
            <th> Position </th>
            <th> Team </th>
            <th> String </th>
            <th> Tag </th>
            <th> Comment </th>
          </tr>
          {data?.players.map((player: Player) => (
            <tr
              key={player.id}
              style={{
                background: player.tag === "IR" ? "var(--ir)" : "transparent",
              }}
            >
              <td> {player.rank} </td>
              <td>
                {" "}
                <a
                  target="_blank"
                  href={`https://www.nfl.com/players/${player.name.replace(
                    " ",
                    "-"
                  )}`} rel="noreferrer"
                >
                  {player.name}
                </a>{" "}
              </td>
              <td style={{ background: getRoleBackground(player.position) }}>
                {" "}
                {player.position}{" "}
              </td>
              <td> {player.team} </td>
              <td>
                <Form
                  method="post"
                  onChange={(e: FormEvent<HTMLFormElement>) => handleChange(e)}
                >
                  <input
                    name="string"
                    type="text"
                    defaultValue={player.string || ""}
                  />
                  <input type="hidden" name="id" value={player.id} />
                </Form>
              </td>
              <td>
                <Form
                  method="post"
                  onChange={(e: FormEvent<HTMLFormElement>) => handleChange(e)}
                >
                  <Select
                    name="tag"
                    options={tagOptions}
                    selected={player.tag || ""}
                    background={getTagBackground(player.tag || "")}
                  />
                  <input type="hidden" name="id" value={player.id} />
                </Form>
              </td>
              <td>
                <Form
                  method="post"
                  onChange={(e: FormEvent<HTMLFormElement>) => handleChange(e)}
                >
                  <input
                    name="note"
                    type="text"
                    defaultValue={player.note || ""}
                  />
                  <input type="hidden" name="id" value={player.id} />
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
