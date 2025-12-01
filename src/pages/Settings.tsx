import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AIClassifierDemo } from '../components/expense/AIClassifierDemo';

export function Settings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    spending: true,
    goals: true,
    alerts: true,
    email: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thông tin đã được cập nhật!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }
    alert('Mật khẩu đã được thay đổi!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1>Cài đặt</h1>

      <Tabs defaultValue="profile" className="bg-white rounded-lg shadow-sm">
        <TabsList className="w-full justify-start rounded-t-lg border-b p-0">
          <TabsTrigger value="profile" className="rounded-none border-b-2 data-[state=active]:border-blue-600">
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="password" className="rounded-none border-b-2 data-[state=active]:border-blue-600">
            Đổi mật khẩu
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none border-b-2 data-[state=active]:border-blue-600">
            Cảnh báo
          </TabsTrigger>
          <TabsTrigger value="ai-demo" className="rounded-none border-b-2 data-[state=active]:border-blue-600">
            🤖 AI Demo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="p-6">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0123456789"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>

            <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>Lưu thay đổi</Button>
          </form>
        </TabsContent>

        <TabsContent value="password" className="p-6">
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>Đổi mật khẩu</Button>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3>Cảnh báo chi tiêu</h3>
                <p className="text-gray-600">Nhận thông báo khi chi tiêu vượt ngưỡng</p>
              </div>
              <Switch
                checked={notifications.spending}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, spending: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3>Nhắc nhở mục tiêu</h3>
                <p className="text-gray-600">Nhận thông báo về tiến độ mục tiêu</p>
              </div>
              <Switch
                checked={notifications.goals}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, goals: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3>Cảnh báo quan trọng</h3>
                <p className="text-gray-600">Nhận cảnh báo về tình hình tài chính</p>
              </div>
              <Switch
                checked={notifications.alerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, alerts: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3>Thông báo qua Email</h3>
                <p className="text-gray-600">Nhận tóm tắt hàng tuần qua email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>

            <Button onClick={() => alert('Cài đặt đã được lưu!')}>
              Lưu cài đặt
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ai-demo" className="p-6">
          <AIClassifierDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}