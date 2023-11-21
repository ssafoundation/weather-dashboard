import { Card, Col, Row } from "antd";
import "./app.scss";
import MainLayout from "./common/layout/MainLayout";
import DataVisualization from "./components/DataVisualization";
import FiveDaysForcast from "./components/FiveDaysForcast";
import SearchWaither from "./components/SearchWaither";
import WeatherInfoGraph from "./components/WeatherInfoGraph";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Row gutter={16}>
          <Col md={24} lg={24} xl={12} style={{ marginBottom: "16px" }}>
            <Card size="small">
              <WeatherInfoGraph />
            </Card>
          </Col>
          <Col md={24} lg={24} xl={12} style={{ marginBottom: "16px" }}>
            <Card size="small">
              <FiveDaysForcast />
            </Card>
          </Col>
          <Col md={24} lg={24} xl={12} style={{ marginBottom: "16px" }}>
            <Card size="small">
              <SearchWaither />
            </Card>
          </Col>
          <Col md={24} lg={24} xl={12}>
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
