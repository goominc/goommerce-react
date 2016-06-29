import React from 'react';

import UserPoliciesKo from './user/UserPoliciesKo';
import UserPoliciesEn from './user/UserPoliciesEn';
import UserPoliciesCn from './user/UserPoliciesCn';

import UserTermsKo from './user/UserTermsKo';
import UserTermsEn from './user/UserTermsEn';
import UserTermsCn from './user/UserTermsCn';

exports.getUserPolicies = (activeLocale) => {
  const userPolicies = {
    ko: <UserPoliciesKo />,
    en: <UserPoliciesEn />,
    'zh-cn': <UserPoliciesCn />,
    'zh-tw': <UserPoliciesCn />,
  };
  return userPolicies[activeLocale];
};

exports.getUserTerms = (activeLocale) => {
  const userTerms = {
    ko: <UserTermsKo />,
    en: <UserTermsEn />,
    'zh-cn': <UserTermsCn />,
    'zh-tw': <UserTermsCn />,
  };
  return userTerms[activeLocale];
};