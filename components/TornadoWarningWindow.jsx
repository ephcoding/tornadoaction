import dayjs from "dayjs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useTornadoWarnings, useTornadoWarningsTest } from "../hooks";

const TornadoWarningWindow = () => {
	const { isLoading, error, data } = useTornadoWarnings();
	let columns, formattedAreas;

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{JSON.stringify(error)}</p>;

	if (data) {
		columns = [
			{
				field: "areaDesc",
				header: "Areas",
			},
			{
				field: "effective",
				header: "Effective",
			},
			{
				field: "expires",
				header: "Expires",
			},
		];

		formattedAreas = data.map(alert => {
			return {
				areas: alert.properties.areaDesc
					.split(";")
					.map(county => county.match(/[\w]+\b/))
					.join(", "),
				effective: dayjs(alert.properties.effective).format("h:mm a"),
				expires: dayjs(alert.properties.expires).format("h:mm a"),
			};
		});
	}

	return (
		<>
			<div className='bg-red-500 border-4 border-red-500 my-5 rounded-lg'>
				<h2 className='text-3xl'>TORNADO WARNINGS</h2>
				<div className='card '>
					<DataTable
						value={formattedAreas}
						responsiveLayout='scroll'
						tableClassName='text-xs'
					>
						<Column field='areaDesc' header='Areas'></Column>
						<Column field='effective' header='Effective'></Column>
						<Column field='expires' header='Expires'></Column>
					</DataTable>
				</div>
			</div>
		</>
	);
};

export default TornadoWarningWindow;
