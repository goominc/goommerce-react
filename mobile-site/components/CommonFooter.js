import React from 'react';

import i18n from 'commons/utils/i18n';

export default React.createClass({
  render() {
    return (
      <footer className="gm-footer">
        <div className="footer-linkshops">
          <div className="footer-info-box">
            <div className="info-gray">
              {i18n.get('mFooter.company1')}<br />
              {i18n.get('mFooter.company2')}<br />
              {i18n.get('mFooter.company3')}<br />
              {i18n.get('mFooter.company4')}<br />
              {i18n.get('mFooter.company5')}<br />
              {i18n.get('mFooter.company6')}
            </div>
            <div className="info-black">
              <div className="info-title">{i18n.get('mFooter.customerCenterTitle')}</div>
              {i18n.get('mFooter.customerCenter1')}<br />
              {i18n.get('mFooter.customerCenter2')}<br />
              {i18n.get('mFooter.customerCenter3')}<br /><br />
              {i18n.get('mFooter.customerCenter4')}<br />
              {i18n.get('mFooter.customerCenter5')}<br />
              {i18n.get('mFooter.customerCenter6')}<br />
              {i18n.get('mFooter.customerCenter7')}<br />
              {i18n.get('mFooter.customerCenter8')}<br />
            </div>
          </div>

          <p className="footer-copyright">
            ©2015 LINKSHOPS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    );
  },
});
