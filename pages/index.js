import React, { useState, useCallback } from "react";
import { EmptyState, List, Page, Card } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const img =
  "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png";

const Index = () => {
  const [isProductPickerOpen, setProductPickerOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleOpenProductPicker = useCallback(
    (openState) => () => setProductPickerOpen(openState),
    [isProductPickerOpen]
  );
  const handleSelectProducts = useCallback(
    (selectionPayload) =>
      setSelectedProducts(
        selectionPayload.selection.map((product) => {
          console.log(product.id);

          return product.title;
        })
      ),
    [selectedProducts]
  );

  const emptyState = (
    <Card sectioned>
      <EmptyState
        heading="Create a subscription box"
        action={{
          content: "Select products",
          onAction: handleOpenProductPicker(true),
        }}
        image={img}
      >
        <p>Select products to create a subscription plan.</p>
      </EmptyState>

      <ResourcePicker
        resourceType="Product"
        open={isProductPickerOpen}
        onSelection={handleSelectProducts}
        onCancel={handleOpenProductPicker(false)}
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
