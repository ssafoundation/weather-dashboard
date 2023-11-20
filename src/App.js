import { Card, Col, Row } from "antd";
import "./app.scss";
import MainLayout from "./common/layout/MainLayout";
import DataVisualization from "./components/DataVisualization";
import FiveDaysForcast from "./components/FiveDaysForcast";
import SearchWaither from "./components/SearchWaither";

function App() {
  // const [data, setData] = useState(null);
  // const apiKey = "31e618eacc32c5120abf649973fe9e73";
  // const city = "London";
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(apiUrl);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error(
  //         "Error fetching data:",
  //         error.response ? error.response.data : error.message
  //       );
  //     }
  //   };

  //   fetchData();
  // }, [apiUrl]);

  // console.log(data);

  return (
    <div className="App">
      <MainLayout>
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: "16px" }}>
            <Card size="small">
              <FiveDaysForcast />
            </Card>
          </Col>
          <Col span={12} style={{ marginBottom: "16px" }}>
            <Card size="small">
              <SearchWaither />
            </Card>
          </Col>
          <Col span={24}>
            <Card size="small">
              <DataVisualization />
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default App;
