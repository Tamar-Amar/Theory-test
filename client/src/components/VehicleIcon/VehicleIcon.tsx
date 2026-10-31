import bus from "../../assets/vehicles/bus.svg";
import car from "../../assets/vehicles/car.svg";
import motorcycle from "../../assets/vehicles/motorcycle.svg";
import tractor from "../../assets/vehicles/tractor.svg";
import truckHeavy from "../../assets/vehicles/truck-heavy.svg";
import truckLight from "../../assets/vehicles/truck-light.svg";

/** אייקוני סוגי רכב (Vehicle icon ב‑Figma) לפי מזהה סוג רישיון */
const ICONS: Record<string, string> = {
  B: car,
  A: motorcycle,
  C1: truckLight,
  C: truckHeavy,
  D: bus,
  "1": tractor,
};

/** מחזיר אלמנט אייקון לסוג הרישיון, או null אם אין אייקון מתאים */
export function VehicleIcon({ licenseId }: { licenseId: string }) {
  const src = ICONS[licenseId];
  if (!src) return null;
  return <img src={src} alt="" width={20} height={20} />;
}
