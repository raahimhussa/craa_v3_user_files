// import { Typography } from '@components';
// import { WrappingFunction } from '@shopify/react-compose';
// import { action } from 'mobx';
// import { observer } from 'mobx-react';
// import { useRootStore } from 'src/stores';
// import uniqid from 'uniqid';
// const withMeta: WrappingFunction = (WrappedComponent) =>
//   observer((props) => {
//     const { routerStore } = useRootStore();

//     const renderText = action((item: any) => (
//       <Typography key={uniqid()} variant="h6">
//         {item.text}
//       </Typography>
//     ));

//     const items = {
//       left: [
//         {
//           text: 'CRAA Assessments',
//           onClick: () => routerStore.go('/home'),
//           renderItem: renderText,
//         },
//       ],
//       center: [],
//       right: [],
//     };

//     return <WrappedComponent {...props} items={items} />;
//   });

// export default withMeta;
