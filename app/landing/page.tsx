"use client";

import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Users, 
  BarChart3, 
  Search, 
  Bell, 
  ChevronDown,
  FolderOpen,
  Share2,
  Star,
  Clock,
  MoreHorizontal,
  Home,
  Folder,
  Trash2,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: 'Total Files', value: '1,234', icon: FileText, change: '+12%' },
    { label: 'Storage Used', value: '2.4 GB', icon: BarChart3, change: '+5%' },
    { label: 'Shared Files', value: '56', icon: Share2, change: '+8%' },
    { label: 'Team Members', value: '12', icon: Users, change: '+2%' }
  ];

  const recentFiles = [
    { name: 'Project Proposal.pdf', size: '2.4 MB', modified: '2 hours ago', type: 'pdf' },
    { name: 'Team Meeting Notes.docx', size: '156 KB', modified: '5 hours ago', type: 'doc' },
    { name: 'Design Assets.zip', size: '24.8 MB', modified: '1 day ago', type: 'zip' },
    { name: 'Budget Report.xlsx', size: '892 KB', modified: '2 days ago', type: 'excel' }
  ];

  const quickActions = [
    { label: 'Upload Files', icon: Upload, color: 'bg-primary' },
    { label: 'Create Folder', icon: FolderOpen, color: 'bg-accent' },
    { label: 'Share Link', icon: Share2, color: 'bg-chart-2' },
    { label: 'View Analytics', icon: BarChart3, color: 'bg-chart-4' }
  ];

  const navigationItems = [
    { label: 'Dashboard', icon: Home, active: true },
    { label: 'My Files', icon: Folder, active: false },
    { label: 'Shared', icon: Users, active: false },
    { label: 'Starred', icon: Star, active: false },
    { label: 'Recent', icon: Clock, active: false },
    { label: 'Trash', icon: Trash2, active: false }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Dropit
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-1 ml-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="pl-10 pr-4 py-2 w-64 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border h-screen sticky top-16">
          <div className="p-6">
            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                    item.active 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-xs text-muted-foreground">2.4/5 GB</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{width: '48%'}}></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your files today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-accent px-2 py-1 bg-accent/10 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-primary/30 group"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${index * 100}ms both`
                  }}
                >
                  <div className={`p-3 ${action.color} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent Files</h2>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div
                    key={file.name}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 100}ms both`
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size} • {file.modified}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'uploaded', file: 'Project Proposal.pdf', time: '2 hours ago' },
                  { action: 'shared', file: 'Team Meeting Notes.docx', time: '5 hours ago' },
                  { action: 'downloaded', file: 'Design Assets.zip', time: '1 day ago' },
                  { action: 'starred', file: 'Budget Report.xlsx', time: '2 days ago' }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200"
                    style={{
                      animation: `slideInRight 0.5s ease-out ${index * 100}ms both`
                    }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        You <span className="font-medium">{activity.action}</span> {activity.file}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;