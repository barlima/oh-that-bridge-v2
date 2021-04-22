import { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import { Formik, Field } from "formik";

import { Input } from "../components/molecules";
import { Title, Alignment, Background } from "../components/atoms";
import { newBridgeFormMap } from "../utils/maps/newBridgeFormMap";

// TODO: if form is needed in other places as well, move it from here to atomic
const FormInput = ({ field, form, ...props }) => (
  <Input {...field} {...props} />
);

const getImageFields = (index?: number): JSX.Element => (
  <div key={`image_fields_${index}`} className="images">
    <Field
      name={`src${index || ""}`}
      placeholder="Source"
      component={FormInput}
    />
    <Field
      name={`text${index || ""}`}
      placeholder="Caption"
      component={FormInput}
    />
    <Field
      name={`link${index || ""}`}
      placeholder="Author"
      component={FormInput}
    />
    <Field
      name={`href${index || ""}`}
      placeholder="Author URL"
      component={FormInput}
    />
  </div>
);

const Add: NextPage = () => {
  const handleSubmit = async (values: any): Promise<void> => {
    const newBridge = newBridgeFormMap(values);
    await fetch(`${process.env.PUBLIC_URL}/api/bridge/create`, {
      method: "POST",
      body: JSON.stringify({ ...newBridge }),
    });
  };

  return (
    <Background>
      <Alignment.Center>
        <Title as="h2" text="Add new bridge" />
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              onChange={(e: any) => {
                if (e.target.name === "bridgeName") {
                  props.setFieldValue(
                    "id",
                    e.target.value.toLowerCase().replace(/\s/g, "-")
                  );
                }
              }}
            >
              <Field
                name="bridgeName"
                placeholder="Name"
                component={FormInput}
              />
              <Field name="id" placeholder="ID" component={FormInput} />

              <Title as="h4" text="Size" />

              <Field
                name="length"
                placeholder="Length"
                type="number"
                component={FormInput}
              />
              <Field
                name="width"
                placeholder="Width"
                type="number"
                component={FormInput}
              />
              <Field
                name="height"
                placeholder="Height"
                type="number"
                component={FormInput}
              />

              <Title as="h4" text="Metadata" />

              <Field
                name="country"
                placeholder="Country"
                component={FormInput}
              />
              <Field name="region" placeholder="Region" component={FormInput} />
              <Field name="city" placeholder="City" component={FormInput} />
              <Field name="lat" placeholder="Latitude" component={FormInput} />
              <Field
                name="long"
                placeholder="Longitude"
                component={FormInput}
              />
              <Field
                name="constructedBy"
                placeholder="Constructed by"
                component={FormInput}
              />
              <Field
                name="opened"
                placeholder="Opened"
                type="date"
                component={FormInput}
              />

              <Title as="h4" text="Image" />

              {getImageFields()}

              <Title as="h4" text="Additional images" />

              {new Array(3).fill(0).map((_, i) => getImageFields(i + 1))}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </Alignment.Center>
    </Background>
  );
};

export default Add;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // if (process.env.NODE_ENV !== "development") {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const Form = styled.form`
  width: 40vw;

  & > *,
  & .images > * {
    margin-bottom: var(--padding);
    width: 100%;
  }
`;

Form.displayName = "Form";
