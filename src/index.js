import dva from 'dva';
import './index.css';
import { createBrowserHistory } from 'history';

// 1. Initialize
const app = dva({
    history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/auth').default);
app.model(require('./models/admin').default);
app.model(require('./models/article').default);
app.model(require('./models/kind').default);
app.model(require('./models/user').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
