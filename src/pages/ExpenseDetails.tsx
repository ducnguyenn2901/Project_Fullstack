import { useState } from "react";
import { Upload, Filter, PieChart } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { TransactionTable } from "../components/expense/TransactionTable";
import { AutoClassifyButton } from "../components/expense/AutoClassifyButton";
import { AIInsightBanner } from "../components/expense/AIInsightBanner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const initialTransactions = [
  {
    id: 1,
    date: "2024-11-24",
    description: "Mua đồ ăn tại siêu thị",
    category: "Ăn uống",
    amount: -350000,
  },
  {
    id: 2,
    date: "2024-11-23",
    description: "Lương tháng 11",
    category: "Thu nhập",
    amount: 25000000,
  },
  {
    id: 3,
    date: "2024-11-22",
    description: "Mua sách giáo trình",
    category: "Giáo dục",
    amount: -480000,
  },
  {
    id: 4,
    date: "2024-11-21",
    description: "Xem phim tại rạp",
    category: "Giải trí",
    amount: -180000,
  },
  {
    id: 5,
    date: "2024-11-20",
    description: "Mua quần áo",
    category: "Mua sắm",
    amount: -850000,
  },
  {
    id: 6,
    date: "2024-11-19",
    description: "Ăn tối nhà hàng",
    category: "Ăn uống",
    amount: -680000,
  },
  {
    id: 7,
    date: "2024-11-18",
    description: "Trả góp tháng 11",
    category: "Vay nợ",
    amount: -1500000,
  },
  {
    id: 8,
    date: "2024-11-17",
    description: "Đổ xăng xe",
    category: "Di chuyển",
    amount: -420000,
  },
  {
    id: 9,
    date: "2024-10-15",
    description: "Mua cà phê sáng",
    category: "Ăn uống",
    amount: -45000,
  },
  {
    id: 10,
    date: "2024-10-10",
    description: "Thanh toán hóa đơn điện",
    category: "Hóa đơn",
    amount: -850000,
  },
  {
    id: 11,
    date: "2024-09-20",
    description: "Đi taxi về nhà",
    category: "Di chuyển",
    amount: -120000,
  },
  {
    id: 12,
    date: "2023-12-24",
    description: "Mua quà Noel",
    category: "Mua sắm",
    amount: -1200000,
  },
  {
    id: 13,
    date: "2023-12-15",
    description: "Lương tháng 12/2023",
    category: "Thu nhập",
    amount: 23000000,
  },
];

export function ExpenseDetails() {
  const [transactions, setTransactions] = useState(
    initialTransactions,
  );
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const handleFileUpload = () => {
    // Mock file upload
    alert(
      "Chức năng tải file sao kê sẽ được triển khai với backend",
    );
  };

  const handleApplyClassification = (
    updatedTransactions: any[],
  ) => {
    setTransactions((prevTransactions) => {
      return prevTransactions.map((t) => {
        const updated = updatedTransactions.find(
          (ut) => ut.id === t.id,
        );
        return updated
          ? { ...t, category: updated.category }
          : t;
      });
    });
  };

  const handleUpdateTransaction = (
    id: number,
    newCategory: string,
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === id ? { ...t, category: newCategory } : t,
      ),
    );
  };

  // Lọc transactions theo năm, tháng và danh mục
  const filteredTransactions = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate
        .getFullYear()
        .toString();
      const transactionMonth = (
        transactionDate.getMonth() + 1
      ).toString();

      const yearMatch =
        selectedYear === "all" ||
        transactionYear === selectedYear;
      const monthMatch =
        selectedMonth === "all" ||
        transactionMonth === selectedMonth;
      const categoryMatch =
        selectedCategory === "all" ||
        transaction.category === selectedCategory;

      return yearMatch && monthMatch && categoryMatch;
    },
  );

  // Đếm số giao dịch chưa phân loại hoặc phân loại "Khác"
  const unclassifiedCount = transactions.filter(
    (t) => !t.category || t.category === "Khác",
  ).length;

  // Tính tổng thu, tổng chi
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Chi tiết chi tiêu
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý và phân loại giao dịch tài chính của bạn
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <AutoClassifyButton
            transactions={transactions}
            onApplyClassification={handleApplyClassification}
          />
          <Button
            onClick={handleFileUpload}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            Tải file sao kê lên
          </Button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <AIInsightBanner
        unclassifiedCount={unclassifiedCount}
        onAutoClassify={() => {}}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Tổng thu nhập
            </CardTitle>
            <PieChart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {totalIncome.toLocaleString("vi-VN")} ₫
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              Tổng chi tiêu
            </CardTitle>
            <PieChart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {totalExpense.toLocaleString("vi-VN")} ₫
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Số dư hiện tại
            </CardTitle>
            <PieChart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {(totalIncome - totalExpense).toLocaleString(
                "vi-VN",
              )}{" "}
              ₫
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc giao dịch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Năm
              </label>
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    Tất cả năm
                  </SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tháng
              </label>
              <Select
                value={selectedMonth}
                onValueChange={setSelectedMonth}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tháng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    Tất cả tháng
                  </SelectItem>
                  <SelectItem value="1">Tháng 1</SelectItem>
                  <SelectItem value="2">Tháng 2</SelectItem>
                  <SelectItem value="3">Tháng 3</SelectItem>
                  <SelectItem value="4">Tháng 4</SelectItem>
                  <SelectItem value="5">Tháng 5</SelectItem>
                  <SelectItem value="6">Tháng 6</SelectItem>
                  <SelectItem value="7">Tháng 7</SelectItem>
                  <SelectItem value="8">Tháng 8</SelectItem>
                  <SelectItem value="9">Tháng 9</SelectItem>
                  <SelectItem value="10">Tháng 10</SelectItem>
                  <SelectItem value="11">Tháng 11</SelectItem>
                  <SelectItem value="12">Tháng 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    Tất cả danh mục
                  </SelectItem>
                  <SelectItem value="Ăn uống">
                    Ăn uống
                  </SelectItem>
                  <SelectItem value="Mua sắm">
                    Mua sắm
                  </SelectItem>
                  <SelectItem value="Giáo dục">
                    Giáo dục
                  </SelectItem>
                  <SelectItem value="Giải trí">
                    Giải trí
                  </SelectItem>
                  <SelectItem value="Di chuyển">
                    Di chuyển
                  </SelectItem>
                  <SelectItem value="Y tế">Y tế</SelectItem>
                  <SelectItem value="Hóa đơn">
                    Hóa đơn
                  </SelectItem>
                  <SelectItem value="Vay nợ">Vay nợ</SelectItem>
                  <SelectItem value="Thu nhập">
                    Thu nhập
                  </SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lịch sử giao dịch</CardTitle>
            <div className="text-sm text-gray-600">
              Hiển thị {filteredTransactions.length} /{" "}
              {transactions.length} giao dịch
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTable
            transactions={filteredTransactions}
            onUpdateTransaction={handleUpdateTransaction}
          />
        </CardContent>
      </Card>
    </div>
  );
}