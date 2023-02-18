import React from 'react';
import FeatureBlock from 'components/feature-block';

const data = [
  {
    id: 1,
    background: '#feeec8',
    title: 'You Order',
    description: 'Add products to your cart, enter your details and confirm.',
  },
  {
    id: 2,
    background: '#ceeffe',
    title: 'We will Prepare',
    description:
      'Our master chef will confirm and prepare your order.',
  },
  {
    id: 3,
    background: '#d4f8c4',
    title: 'After Eating',
    description: 'Once you are done proceed to the counter and pay your total amount.',
  },
];

export default function HowItWorks() {
  return (
    <div className="flex w-full px-20px md:p-30px py-40px rounded border border-gray-300 bg-white">
      <div className="feature-block-wrapper w-full grid grid-cols-1 gap-x-30px gap-y-40px md:grid-cols-2 xl:grid-cols-3 xxl:gap-30px">
        {data.map((item, index) => (
          <FeatureBlock
            key={item.id}
            title={item.title}
            description={item.description}
            counterBg={item.background}
            counter={index + 1}
            className="feature-block"
          />
        ))}
      </div>
    </div>
  );
}
