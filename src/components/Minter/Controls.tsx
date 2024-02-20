import { ASSETS } from "@/constants/assets";
import { MinterContext } from "@/contexts/minterContext";
import { CSSProperties, useCallback, useContext } from "react";
import ButtonPad from "../shared/ButtonPad";
import ButtonPadLight from "../shared/ButtonPadLight";
import RoundedFrame from "../shared/RoundedFrame";
import AssetButton from "./AssetButton";

export type AssetType = keyof typeof ASSETS;

export const tabs: AssetType[] = [
  "OUTFIT",
  "BACKGROUND",
  "HEADGEAR",
  "GRIP_RIGHT",
];

export default function Controls({ style }: { style?: CSSProperties }) {
  const { body, setBody, randomize, tab, setTab } = useContext(MinterContext);

  const [activeTab] = tab;

  const BannyButtons = useCallback(
    () => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {ASSETS["BODY"].map((b) => {
          let color = "";
          switch (b) {
            case "alien.png":
              color = "#1dbc00";
              break;
            case "_banny.png":
              color = "#ffc407";
              break;
            case "orange.png":
              color = "#ea5608";
              break;
            case "pink.png":
              color = "#ff5bb3";
              break;
          }

          return (
            <ButtonPadLight
              key={b}
              style={{ height: 40, width: 40 }}
              fillFg={color}
              onClick={() => setBody?.(b)}
              active={body === b}
            />
          );
        })}
      </div>
    ),
    [body, setBody]
  );

  return (
    <RoundedFrame shadow>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          height: "100%",
          boxSizing: "border-box",
          gap: 20,
          background: "#00000044",
          ...style,
        }}
      >
        <BannyButtons />

        {tabs.map((t) => (
          <AssetButton
            key={t}
            asset={t}
            active={activeTab === t}
            onClick={activeTab === t || !setTab ? undefined : () => setTab(t)}
          />
        ))}

        <ButtonPad
          style={{ height: 40, fontSize: "1.4rem" }}
          onClick={randomize}
        >
          RANDOMIZE
        </ButtonPad>

        {/* <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background: "#00000064",
          }}
          />
          <div
          style={{
            position: "absolute",
            top: 0,
            left: 6,
            right: 0,
            height: 6,
            background: "#00000064",
          }}
        /> */}
      </div>
    </RoundedFrame>
  );
}