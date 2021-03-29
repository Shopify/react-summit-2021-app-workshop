import React, { useState } from "react";
import { Page, Card, EmptyState, List } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const img =
  "https://raw.githubusercontent.com/Shopify/react-summit-2021-app-workshop/main/_extras/empty_state_apps.webp";

const Index = () => {
  const [isProductPickerOpen, setProductPickerOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const emptyState = (
    <Card sectioned>
      <EmptyState
        heading="Create a subscription box"
        action={{
          content: "Select products",
          onAction: () => setProductPickerOpen(true),
        }}
        image={img}
      >
        <p>Select products to create a subscription plan.</p>
      </EmptyState>

      <ResourcePicker
        resourceType="Product"
        open={isProductPickerOpen}
        onSelection={(selectPayload) => {
          const selected = selectPayload.selection.map((product) => {
            return product.id;
          });
          console.log(selected);

          setSelectedProducts(selected);
        }}
        onCancel={() => setProductPickerOpen(false)}
      />
    </Card>
  );

  const productList = (
    <Card sectioned title="Create a box containing products">
      <List type="bullet">
        {selectedProducts.map((product) => (
          <List.Item>{product}</List.Item>
        ))}
      </List>
    </Card>
  );

  return <Page>{selectedProducts.length ? productList : emptyState}</Page>;
};

export default Index;
