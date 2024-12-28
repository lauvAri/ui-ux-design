// NoticeShow.js
import { notices } from './notices.js';

const NoticeShow = {
    template: `
<el-container>
    <el-main v-if="notice" class="notice-main" style="padding: 20px;">
      <h1 class="notice-title" style="text-align: center;font-size: 24px; margin-bottom: 20px;">{{ notice.info }}</h1>
      <div class="notice-body" v-html="notice.mainText" style=" margin: 0 400px; font-size: 16px; line-height: 3;"></div>
      <div class="notice-footer" style="text-align: right; margin-top: 30px; margin-right: 400px">
        <el-label><strong>发布方:</strong> {{ notice.source }}</el-label>
        <el-label><strong>日期:</strong> {{ notice.date }}</el-label>
      </div>
    </el-main>
    
    <el-main v-else>
      <p>未找到公告信息。</p>
    </el-main>
  </el-container>
`,

    data() {
        return {
            notice: null
        };
    },
    created() {
        // 从 URL 参数中获取公告 ID
        const urlParams = new URLSearchParams(window.location.search);
        const noticeId = urlParams.get('id');
        // 根据 ID 查找公告
        this.notice = notices.find(notice => notice.id === noticeId);
    }
};

export default NoticeShow;

if (typeof window !== 'undefined') {
    Vue.component('notice-show', NoticeShow);
}
