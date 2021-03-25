import React, { useState, useCallback, useEffect } from "react";
import { EmptyState, Layout, Page, Card, DataTable } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

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
          console.log(product);

          return [product.title, product.status];
        })
      ),
    [selectedProducts]
  );

  const emptyState = (
    <>
      <EmptyState
        heading="Discount your products temporarily"
        action={{
          content: "Select products",
          onAction: handleOpenProductPicker(true),
        }}
        image={img}
      >
        <p>Select products to change their price temporarily.</p>
      </EmptyState>

      <ResourcePicker
        resourceType="Product"
        open={isProductPickerOpen}
        onSelection={handleSelectProducts}
        onCancel={handleOpenProductPicker(false)}
      />
    </>
  );

  const productList = (
    <Layout.AnnotatedSection
      title="Default discount"
      description="Add a product to Sample App, it will automatically be discounted."
    >
      <DataTable
        columnContentTypes={["text", "text"]}
        headings={["Product", "Status"]}
        rows={selectedProducts}
      />
    </Layout.AnnotatedSection>
  );

  return (
    <Page>
      <Layout>{selectedProducts.length ? productList : emptyState}</Layout>
    </Page>
  );
};

export default Index;
