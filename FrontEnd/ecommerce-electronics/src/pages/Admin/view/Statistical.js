import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col, Card, Table, Badge, Form, Button,Dropdown } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import { getAccessToken } from '../../../utils/commonFunction';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu giả định
const originalSalesData = [
  { date: '2024-03-15', sales: 5000, category: 'Clothing' },
  { date: '2024-03-16', sales: 4500, category: 'Sportswear' },
  { date: '2024-03-17', sales: 8000, category: 'Accessories' },
  { date: '2024-03-18', sales: 7000, category: 'Lingerie & Nightwear' },
  { date: '2024-03-19', sales: 8500, category: 'Body Fit' },
  { date: '2024-03-20', sales: 7500, category: 'Clothing' },
  { date: '2024-03-21', sales: 6000, category: 'Sportswear' },
];


// Component
const Statistical = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [apply, setApply] = useState(false);
  const filteredData = originalSalesData;
  const [data, setData] = useState([]);
  const[linedata,setLineData] = useState([]);
  const[chartdata,setChartData] = useState([]);
  const token = getAccessToken();
  const handleApply = () => {
    setApply(true);
  };
  const predefinedColors = ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

  const generateColorsByIndex = (count) => {
    return Array.from({ length: count }, (_, index) => predefinedColors[index % predefinedColors.length]);
  };
  // Dữ liệu cho biểu đồ "Sales Analytics"
  const salesAnalyticsData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: 'Sales',
        data: filteredData.map((item) => item.sales),
        borderColor: '#FF8C42',
        backgroundColor: 'rgba(255, 140, 66, 0.2)',
        fill: true,
      },
    ],
  };
  

  // Tính dữ liệu "Sales By Category" dựa trên dữ liệu lọc
  const categorySales = filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.sales;
    return acc;
  }, {});

  const salesByCategoryData = {
    labels: Object.keys(categorySales),
    datasets: [
      {
        data: Object.values(categorySales),
        backgroundColor: ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'],
      },
    ],
  };
  useEffect(() => {
    if (!apply) return; // Chỉ chạy khi nút "Áp dụng" được nhấn
    fetchOrderDetail();
    setApply(false);
  },[apply]);
  console.log("day la apply",apply)
  const fetchOrderDetail = async () => {
    try{
      const response = await axios.get(
        "http://localhost:8080/api/order_detail/by-order-time",{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            startTime: startDate,
            endTime: endDate
          }
        }
      );
      setLineData(aggregateData(response.data,startDate,endDate));
      setChartData(aggregateCategoryData(response.data,startDate,endDate));
      setData(response.data);
      setData(response.data);
    }
    catch(error){
      console.log("Failed to fetch order  detail: ", error);
    }
  }
console.log("data được fetch",data)
console.log("data cho line ",linedata)
console.log("data cho chart",chartdata)
const generateDateRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const dateRange = [];
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dateRange.push(d.toISOString().split("T")[0]); // Thêm ngày vào danh sách
  }
  
  return dateRange;
};
/* logic dữ liệu lấy thông tin số lượng sản phẩm và thông tin doanh thu trong ngày với khoảng thời gian được chọn */
const aggregateData = (data, startTime, endTime) => {
  // Bước 1: Tạo khoảng ngày từ startTime đến endTime
  const dateRange = generateDateRange(startTime, endTime);
  
  // Bước 2: Tính toán tổng từ data
  const aggregated = data.reduce((acc, item) => {
    if (item.orders && item.orders.orderTime) { // Kiểm tra orderTime
      const date = item.orders.orderTime.split("T")[0]; // Lấy phần ngày từ orderTime
      if (!acc[date]) {
        acc[date] = { totalQuantity: 0, totalRevenue: 0 };
      }
      acc[date].totalQuantity += item.quantity || 0;
      acc[date].totalRevenue += item.discountPrice || 0;
    }
    return acc;
  }, {});
  
  // Bước 3: Đảm bảo tất cả các ngày đều hiển thị
  const result = dateRange.map((date) => ({
    date,
    totalQuantity: aggregated[date]?.totalQuantity || 0,
    totalRevenue: aggregated[date]?.totalRevenue || 0,
  }));

  return result;
};
/* Kết thúc đoạn logic */
console.log("du lieu thong ke so luong va doanh thu theo ngay",aggregateData(data,startDate,endDate))
/** Logic xử lý dữ liệu thống kê số lượng và danh thu theo danh mục sản phẩm trong khoảng thời gian được chọn **/
const aggregateCategoryData = (data, startTime, endTime) => {
  const result = data.reduce((acc, item) => {
    const category = item.product.category.name;
    if (!acc[category]) {
      acc[category] = { category, totalQuantity: 0, totalRevenue: 0 };
    }
    acc[category].totalQuantity += item.quantity || 0;
    acc[category].totalRevenue += item.discountPrice || 0;
    return acc;
  }, {});
  return Object.values(result);
}
console.log("du lieu thong ke so luong va doanh thu theo danh muc san pham",aggregateCategoryData(data,startDate,endDate))
const lineDataAnalys = {
  labels:aggregateData(data,startDate,endDate).map((item) => item.date),
  datasets: [
    {
      label: "Số lượng (Quantity)",
      data: aggregateData(data,startDate,endDate).map((item) => item.totalQuantity),
      borderColor: "#1E90FF",
      backgroundColor: "rgba(30, 144, 255, 0.2)",
      fill: false,
    },
    {
      label: "Doanh thu (Revenue)",
      data: aggregateData(data,startDate,endDate).map((item) => item.totalRevenue),
      borderColor: "#FF8C42",
      backgroundColor: "rgba(255, 140, 66, 0.2)",
      fill: false,
      yAxisID: "y-revenue", // Thêm trục Y riêng nếu cần
    },
  ],
};
const chartDataAnalys={
  labels:aggregateCategoryData(data,startDate,endDate).map((item) => item.category),
  datasets: [
    {
      label: "doanh thu(vnd)",
      data:aggregateCategoryData(data,startDate,endDate).map((item) => item.totalRevenue),
      backgroundColor: generateColorsByIndex(aggregateCategoryData(data,startDate,endDate).length),
    },
  ],
}
/**Kết thúc logic **/
  return (
    <Container fluid className="py-4 bg-light">
      <h2 className="mb-4">Dashboard</h2>

      {/* Bộ lọc ngày và nút Áp dụng */}
      <Row className="mb-3 align-items-center">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleApply}
          >
            Áp dụng
          </Button>
        </Col>
      </Row>

      {/* Biểu đồ Sales Analytics */}
      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Thống kê  theo ngày</Card.Title>
              <Line data={lineDataAnalys} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Thống kê theo danh mục sản phẩm</Card.Title>
              <Doughnut data={chartDataAnalys} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
     
      <Row>
      <h5>Các sản phẩm được bán</h5>
        <Col>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
               <div className="mb-3">
                
             
              </div>
                <Table className="table table-hover table-striped align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>PRODUCT NAME</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th>SOLD</th>
                      <th>TOTAL EARNING</th>
                    </tr>
                  </thead>
                  {data && data.length > 0 ? (
                    data.map((item) => (
                      <tbody key={item.id}> {/* Thêm key để tránh lỗi React */}
                        <tr>
                          <td>{item.product?.name || "N/A"}</td>
                          <td>{item.productPrice} đ</td>
                          <td >
                            <Badge bg="success">{item.product?.quantity > 0 ? "Còn hàng" : "Hết hàng"}</Badge>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.productPrice * item.quantity} đ</td>
                        </tr>
                      </tbody>
                    ))
                  ) : (
                    <p>Chưa có thông tin dữ liệu ... </p> // Hiển thị loading khi data chưa có
                  )}
                </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistical;
