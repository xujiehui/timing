const Docs = () => {
  const sections = [
    {
      title: '快速开始',
      content: [
        {
          subtitle: '安装应用',
          text: '根据您的操作系统下载对应版本的应用，按照安装步骤完成安装。',
        },
        {
          subtitle: '首次启动',
          text: '启动应用后，您会看到简洁的主界面，包含任务创建表单和任务列表。',
        },
        {
          subtitle: '创建第一个任务',
          text: '选择操作类型（如关机），设置执行时间，点击"创建任务"即可。',
        },
      ],
    },
    {
      title: '创建任务',
      content: [
        {
          subtitle: '选择操作类型',
          text: '应用支持五种操作类型：关机、重启、睡眠、深度休眠、锁定屏幕。根据您的需求选择相应的操作。',
        },
        {
          subtitle: '设置时间',
          text: '您可以选择两种时间设置方式：\n• 绝对时间：选择具体的日期和时间（如：2024-12-25 23:00:00）\n• 相对时间：设置多少分钟后执行（如：30分钟后、2小时后）',
        },
        {
          subtitle: '确认创建',
          text: '设置完成后，点击"创建任务"按钮，任务将被添加到任务列表中。',
        },
      ],
    },
    {
      title: '管理任务',
      content: [
        {
          subtitle: '查看任务列表',
          text: '所有已创建的任务都会显示在任务列表中，包括任务类型、执行时间、剩余时间等信息。',
        },
        {
          subtitle: '取消任务',
          text: '对于待执行的任务，您可以随时点击"取消"按钮来取消任务。已执行或已取消的任务无法再次操作。',
        },
        {
          subtitle: '删除任务',
          text: '已完成或已取消的任务可以从列表中删除，保持界面整洁。',
        },
      ],
    },
    {
      title: '系统托盘',
      content: [
        {
          subtitle: '最小化到托盘',
          text: '点击窗口关闭按钮或最小化按钮，应用会最小化到系统托盘，不会完全退出。',
        },
        {
          subtitle: '托盘图标',
          text: '托盘图标会显示当前任务状态，有任务时会显示任务数量。',
        },
        {
          subtitle: '快速操作',
          text: '右键点击托盘图标，可以快速创建新任务、显示窗口或退出应用。',
        },
        {
          subtitle: '恢复窗口',
          text: '双击托盘图标可以快速恢复应用窗口。',
        },
      ],
    },
    {
      title: '设置说明',
      content: [
        {
          subtitle: '打开设置',
          text: '点击主界面右上角的设置图标，打开设置面板。',
        },
        {
          subtitle: '开机自启动',
          text: '在设置中可以开启"开机自启动"选项，让应用在系统启动时自动运行。',
        },
        {
          subtitle: '默认操作类型',
          text: '可以设置默认的操作类型，创建任务时会自动选择该类型。',
        },
        {
          subtitle: '提醒时间',
          text: '可以自定义任务执行前的提醒时间，默认是执行前5分钟和1分钟提醒。',
        },
        {
          subtitle: '主题设置',
          text: '支持浅色和深色两种主题，可以根据您的喜好进行切换。',
        },
      ],
    },
  ];

  const faqs = [
    {
      question: '执行系统操作需要什么权限？',
      answer: '执行关机、重启等系统操作需要管理员（Windows）或 root（Linux/macOS）权限。应用会在执行前请求相应权限。',
    },
    {
      question: '任务可以取消吗？',
      answer: '是的，所有待执行的任务都可以随时取消。已执行或已取消的任务无法再次操作。',
    },
    {
      question: '应用会占用很多系统资源吗？',
      answer: '不会。应用设计为轻量级，内存占用小于50MB，CPU占用在空闲时小于1%。',
    },
    {
      question: '支持重复任务吗？',
      answer: '当前版本不支持重复任务（如每天定时关机），但这是未来版本的计划功能。',
    },
    {
      question: '数据会上传到云端吗？',
      answer: '不会。所有数据都存储在本地，不会上传到任何服务器，保护您的隐私。',
    },
    {
      question: '如何反馈问题或建议？',
      answer: '您可以在 GitHub 上提交 Issue：https://github.com/xujiehui/timing/issues',
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            使用文档
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            详细的使用指南和常见问题解答
          </p>
        </div>

        {/* 使用指南 */}
        <div className="space-y-8 md:space-y-12 mb-16">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.content.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <h3 className="text-lg font-medium mb-2">{item.subtitle}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 常见问题 */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">常见问题 (FAQ)</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 故障排除 */}
        <div className="mt-12 bg-muted/50 border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">故障排除</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium mb-1">任务没有执行</h3>
              <p>• 检查应用是否正在运行</p>
              <p>• 确认系统时间是否正确</p>
              <p>• 检查是否有足够的系统权限</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">无法执行系统操作</h3>
              <p>• 确保以管理员/root权限运行应用</p>
              <p>• 检查系统是否允许该操作</p>
              <p>• 查看应用日志了解详细错误信息</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">应用无法启动</h3>
              <p>• 检查系统是否满足最低要求</p>
              <p>• 重新安装应用</p>
              <p>• 查看错误日志或提交 Issue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
