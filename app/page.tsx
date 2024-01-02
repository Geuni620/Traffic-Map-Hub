/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
import { MapContainer } from 'lib/kakao-map';
import path from 'path';
import * as XLSX from 'xlsx';
XLSX.set_fs(fs);

export default async function Index() {
  // const cookieStore = cookies();

  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient(cookieStore);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  const filePath = path.resolve('.', 'public/data/2022_traffic_x_y_data.xlsx');
  const workbook = XLSX.readFile(filePath);
  console.log('workbook', workbook);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <MapContainer data={data} />
    </div>
  );
}
