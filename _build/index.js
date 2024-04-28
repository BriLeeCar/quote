var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 41,
        columnNumber: 7
      }, this),
      {
        onAllReady() {
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 82,
        columnNumber: 7
      }, this),
      {
        onShellReady() {
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var meta = () => [
  {
    charset: "utf-8",
    title: "rAGC",
    viewport: "width=device-width,initial-scale=1"
  }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 21,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "layout", children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 20,
    columnNumber: 3
  }, this);
}

// app/routes/newQuote.tsx
var newQuote_exports = {};
__export(newQuote_exports, {
  default: () => NewQuote,
  links: () => links,
  loader: () => loader
});
import { useLoaderData as useLoaderData2 } from "@remix-run/react";
import React2 from "react";

// app/lib/Quotes.ts
var Quote = class {
  ID;
  dateCreated;
  customer;
  material;
  process;
  quantities;
  constructor(quoteID, date, customer, material, process2, quantities) {
    this.ID = quoteID, this.dateCreated = date || /* @__PURE__ */ new Date(), this.quantities = quantities || [], this.material = material || [], this.customer = customer || null, this.process = process2 || [];
  }
  //#region ? ---------- CUSTOMER ----------
  clearCustomer() {
    this.customer = null;
  }
  setCustomer(customer) {
  }
  // #endregion ? --------------------
  //#region ? ---------- MATERIAL ----------
  clearMaterial() {
    this.material = [];
  }
  addMaterial(material) {
    this.material == null && (this.material = []), this.material.push(material);
  }
  // #endregion ? --------------------
  //#region ? ---------- PROCESS ----------
  // #endregion ? --------------------
  //#region ? ---------- QUANTITIES ----------
  updateQTY(id, quantity) {
    this.quantities[id].amount = quantity;
  }
  addQTY(qty) {
    this.quantities.push({ amount: qty, price: 0 });
  }
  // #endregion ? --------------------
}, prepareUpdate = (oldQuote) => Object.assign(
  new Quote(oldQuote.ID, oldQuote.dateCreated),
  oldQuote
);

// app/styles/css/global.css
var global_default = "/build/_assets/global-33B6NIV2.css";

// app/lib/prisma.server.ts
import { PrismaClient } from "@prisma/client";
var prisma2;
global.prisma || (global.prisma = new PrismaClient()), prisma2 = global.prisma, prisma2.$connect();

// app/lib/getCustomers.tsx
var allCustomers = async () => await prisma2.customers.findMany({});
var allMaterials = async () => ({
  materials: await prisma2.materials.findMany({})
}).materials;

// app/components/quoteElements.tsx
import { useLoaderData } from "@remix-run/react";
import React from "react";

// app/components/accentEls.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var OnClickHeader = ({
  headerText,
  clickInner,
  className,
  clickFunction
}) => /* @__PURE__ */ jsxDEV3("h3", { className, children: [
  headerText,
  /* @__PURE__ */ jsxDEV3("button", { type: "button", onClick: () => clickFunction, children: clickInner }, void 0, !1, {
    fileName: "app/components/accentEls.tsx",
    lineNumber: 22,
    columnNumber: 4
  }, this)
] }, void 0, !0, {
  fileName: "app/components/accentEls.tsx",
  lineNumber: 20,
  columnNumber: 5
}, this);

// app/components/quoteElements.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function typeChoices(type) {
  switch (type) {
    case "customer":
      return {
        by: "customerName",
        id: "customerDetails",
        summary: "Customer"
      };
    case "material":
      return {
        by: "material",
        id: "materialDetails",
        summary: "Material"
      };
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}
var searchQuery = (filterData, searchList) => {
  try {
    return searchList.filter(
      (item) => item[filterData.by].toLowerCase().includes(filterData.search.toLowerCase())
    );
  } catch (e) {
    return console.log(e, searchList), [];
  }
};
function SectionDetails({
  quote,
  updateQuote,
  newQuote,
  type
}) {
  let data = useLoaderData();
  try {
    let { by, id, summary } = typeChoices(type), searchList = data[type + "s"], [searchData, filterData] = React.useState(searchList), handleSearch = (thisSearch) => {
      thisSearch.length >= 2 && filterData(searchQuery({ by, search: thisSearch }, searchList));
    }, handleBlur = (thisPick) => {
      let selection = searchQuery({ by, search: thisPick }, searchList);
      selection.length === 1 ? (type === "customer" ? newQuote.customer = selection[0] : newQuote.addMaterial(selection[0]), updateQuote(newQuote)) : thisPick.length == 0 && (type === "customer" && newQuote.clearCustomer(), updateQuote(newQuote));
    };
    return /* @__PURE__ */ jsxDEV4("details", { id, children: [
      /* @__PURE__ */ jsxDEV4("summary", { children: [
        summary,
        /* @__PURE__ */ jsxDEV4("span", { children: [
          /* @__PURE__ */ jsxDEV4(
            "input",
            {
              type: "search",
              id: type + "Search",
              name: type + "Search",
              list: type + "SrcList",
              placeholder: "Current " + type[0].toUpperCase() + type.slice(1),
              onChange: (e) => {
                handleSearch(e.target.value);
              },
              onBlur: (e) => {
                handleBlur(e.target.value);
              }
            },
            void 0,
            !1,
            {
              fileName: "app/components/quoteElements.tsx",
              lineNumber: 102,
              columnNumber: 7
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4("datalist", { id: type + "SrcList", children: /* @__PURE__ */ jsxDEV4(SearchDataList, { data: searchData, by }, void 0, !1, {
            fileName: "app/components/quoteElements.tsx",
            lineNumber: 116,
            columnNumber: 8
          }, this) }, void 0, !1, {
            fileName: "app/components/quoteElements.tsx",
            lineNumber: 115,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV4("button", { id: "btnNewCustomer", type: "button", className: "addNew", children: "+ New" }, void 0, !1, {
            fileName: "app/components/quoteElements.tsx",
            lineNumber: 118,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/quoteElements.tsx",
          lineNumber: 101,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 99,
        columnNumber: 5
      }, this),
      type === "customer" ? /* @__PURE__ */ jsxDEV4(CustomerSelection, { customer: quote.customer }, void 0, !1, {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 124,
        columnNumber: 6
      }, this) : /* @__PURE__ */ jsxDEV4(MaterialSelection, { material: quote.material }, void 0, !1, {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 126,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/quoteElements.tsx",
      lineNumber: 98,
      columnNumber: 4
    }, this);
  } catch (e) {
    console.error(e);
  }
}
function SearchDataList({
  data,
  by
}) {
  return data.map((ea) => /* @__PURE__ */ jsxDEV4("option", { label: ea[by], children: ea[by] }, ea.ID, !1, {
    fileName: "app/components/quoteElements.tsx",
    lineNumber: 143,
    columnNumber: 3
  }, this));
}
function CustomerSelection({ customer }) {
  return customer ? /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h3", { children: customer.customerName }, void 0, !1, {
      fileName: "app/components/quoteElements.tsx",
      lineNumber: 153,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { children: [
      customer.address1,
      /* @__PURE__ */ jsxDEV4("br", {}, void 0, !1, {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 156,
        columnNumber: 5
      }, this),
      customer.address2
    ] }, void 0, !0, {
      fileName: "app/components/quoteElements.tsx",
      lineNumber: 154,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { children: [
      customer.city,
      ", ",
      customer.state,
      " ",
      customer.zip
    ] }, void 0, !0, {
      fileName: "app/components/quoteElements.tsx",
      lineNumber: 159,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/quoteElements.tsx",
    lineNumber: 152,
    columnNumber: 3
  }, this) : null;
}
function MaterialSelection({ material }) {
  return material.length >= 1 ? material.map((item, index) => /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4(
      OnClickHeader,
      {
        className: "headerMat",
        headerText: item.material,
        clickInner: "X",
        clickFunction: () => {
        }
      },
      void 0,
      !1,
      {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 171,
        columnNumber: 6
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4(
      "h3",
      {
        className: "headerMat",
        style: { display: "flex", justifyContent: "space-between" },
        children: [
          item.material,
          /* @__PURE__ */ jsxDEV4("span", { children: "X" }, void 0, !1, {
            fileName: "app/components/quoteElements.tsx",
            lineNumber: 182,
            columnNumber: 7
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/quoteElements.tsx",
        lineNumber: 177,
        columnNumber: 6
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4("p", { children: item.description }, void 0, !1, {
      fileName: "app/components/quoteElements.tsx",
      lineNumber: 184,
      columnNumber: 6
    }, this)
  ] }, index, !0, {
    fileName: "app/components/quoteElements.tsx",
    lineNumber: 170,
    columnNumber: 5
  }, this)) : null;
}

// app/routes/newQuote.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: global_default.toString() }
];
async function loader() {
  let customers = await allCustomers(), materials = await allMaterials(), quote = await prisma.quotes.findFirst({
    orderBy: {
      ID: "desc"
    },
    select: {
      ID: !0
    }
  });
  return {
    customers,
    materials,
    quote
  };
}
var thisQuote = (ID) => new Quote(ID + 1);
function NewQuote() {
  let data = useLoaderData2(), [quote, updateQuote] = React2.useState(thisQuote(data.quote.ID)), [notes, setNotes] = React2.useState(), [formData, setFormData] = React2.useState({
    customerSrc: "",
    materialSrc: "",
    customer: quote.customer,
    material: quote.material,
    process: [],
    addedQty: 0,
    notes: []
  }), newQuote = prepareUpdate(quote);
  function handleQtyChanges(type, params) {
    switch (type) {
      case "add":
        newQuote.addQTY(formData.addedQty);
        break;
      case "remove":
        break;
      case "update":
        newQuote.updateQTY(params.index, params.newValue);
    }
    updateQuote(newQuote);
  }
  return /* @__PURE__ */ jsxDEV5("main", { id: "newQuote", children: [
    /* @__PURE__ */ jsxDEV5("h2", { children: "New Quote" }, void 0, !1, {
      fileName: "app/routes/newQuote.tsx",
      lineNumber: 91,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV5("form", { children: [
      /* @__PURE__ */ jsxDEV5("fieldset", { children: [
        /* @__PURE__ */ jsxDEV5("span", { id: "dateCreated", children: [
          /* @__PURE__ */ jsxDEV5("b", { children: "Created:" }, void 0, !1, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 96,
            columnNumber: 7
          }, this),
          newQuote.dateCreated.toLocaleDateString()
        ] }, void 0, !0, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 95,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV5("span", { id: "quoteNumber", children: [
          /* @__PURE__ */ jsxDEV5("b", { children: "ID:" }, void 0, !1, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 100,
            columnNumber: 7
          }, this),
          newQuote.ID
        ] }, void 0, !0, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 99,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV5("span", { id: "salesRep", children: [
          /* @__PURE__ */ jsxDEV5("b", { children: "Rep:" }, void 0, !1, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 104,
            columnNumber: 7
          }, this),
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 103,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/newQuote.tsx",
        lineNumber: 94,
        columnNumber: 5
      }, this),
      " ",
      /* @__PURE__ */ jsxDEV5(
        SectionDetails,
        {
          quote,
          updateQuote,
          newQuote,
          type: "customer"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 109,
          columnNumber: 5
        },
        this
      ),
      " ",
      /* @__PURE__ */ jsxDEV5(
        SectionDetails,
        {
          quote,
          updateQuote,
          newQuote,
          type: "material"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 117,
          columnNumber: 5
        },
        this
      ),
      " ",
      /* @__PURE__ */ jsxDEV5("details", { id: "processDetails", children: [
        /* @__PURE__ */ jsxDEV5("summary", { children: [
          "Details",
          /* @__PURE__ */ jsxDEV5("span", { children: [
            /* @__PURE__ */ jsxDEV5("button", { id: "btnAddProcess", type: "button", children: "+ Add Process" }, void 0, !1, {
              fileName: "app/routes/newQuote.tsx",
              lineNumber: 142,
              columnNumber: 8
            }, this),
            /* @__PURE__ */ jsxDEV5("button", { id: "btnAddMachine", type: "button", children: "+ Add Machine" }, void 0, !1, {
              fileName: "app/routes/newQuote.tsx",
              lineNumber: 145,
              columnNumber: 8
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 141,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 139,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { id: "addedProcessList" }, void 0, !1, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 150,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/newQuote.tsx",
        lineNumber: 138,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV5("details", { id: "addQtyDetails", children: [
        /* @__PURE__ */ jsxDEV5("summary", { children: [
          "Quantities",
          /* @__PURE__ */ jsxDEV5("span", { children: [
            /* @__PURE__ */ jsxDEV5(
              "input",
              {
                id: "addQty",
                name: "addQty",
                type: "number",
                min: "1",
                placeholder: "Qty",
                step: "1",
                className: "minWidth",
                onChange: (e) => {
                  let newData = Object.assign({}, formData);
                  newData.addedQty = parseInt(e.target.value), setFormData(newData);
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/newQuote.tsx",
                lineNumber: 158,
                columnNumber: 8
              },
              this
            ),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                id: "btnAddQty",
                type: "button",
                onClick: () => handleQtyChanges("add"),
                children: "+ Add"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/newQuote.tsx",
                lineNumber: 172,
                columnNumber: 8
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 157,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 155,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { id: "addedQtyList", children: quote.quantities.map(
          (qtys, index) => /* @__PURE__ */ jsxDEV5("span", { children: [
            /* @__PURE__ */ jsxDEV5(
              "input",
              {
                type: "number",
                min: "1",
                placeholder: "Qty",
                step: "1",
                className: "minWidth",
                defaultValue: qtys.amount,
                onChange: (e) => {
                  let newValue = parseInt(e.target.value);
                  handleQtyChanges("update", { index, newValue, qtys });
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/newQuote.tsx",
                lineNumber: 184,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ jsxDEV5(
              "input",
              {
                type: "number",
                min: "0",
                placeholder: "$0.000",
                step: ".0001",
                className: "minWidth",
                onChange: () => {
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/newQuote.tsx",
                lineNumber: 196,
                columnNumber: 9
              },
              this
            )
          ] }, index, !0, {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this)
        ) }, void 0, !1, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 181,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/newQuote.tsx",
        lineNumber: 154,
        columnNumber: 5
      }, this),
      " ",
      /* @__PURE__ */ jsxDEV5("details", { open: !0, id: "notesDetails", children: [
        /* @__PURE__ */ jsxDEV5("summary", { children: "Notes" }, void 0, !1, {
          fileName: "app/routes/newQuote.tsx",
          lineNumber: 213,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV5(
          "textarea",
          {
            id: "notes",
            name: "notes",
            placeholder: "Enter Notes Here..."
          },
          void 0,
          !1,
          {
            fileName: "app/routes/newQuote.tsx",
            lineNumber: 214,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/newQuote.tsx",
        lineNumber: 212,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/newQuote.tsx",
      lineNumber: 92,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/newQuote.tsx",
    lineNumber: 90,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader2
});
import { json } from "@remix-run/node";
import { useLoaderData as useLoaderData3 } from "@remix-run/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
async function loader2() {
  let feed = await prisma2.customers.findMany({
    select: {
      ID: !0,
      customerName: !0
    }
  });
  return json({ feed });
}
function Index() {
  let { feed } = useLoaderData3();
  return /* @__PURE__ */ jsxDEV6("div", { className: "page", children: /* @__PURE__ */ jsxDEV6("main", { children: feed.map((x) => /* @__PURE__ */ jsxDEV6("div", { className: "post", children: x.customerName }, x.ID, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this)) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 20,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 19,
    columnNumber: 3
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-HSR56S75.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-COGLZBDS.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-SWY5ICHL.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-I2GEKSHJ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: "index", index: void 0, caseSensitive: void 0, module: "/build/routes/index-YLQECT4I.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/newQuote": { id: "routes/newQuote", parentId: "root", path: "newQuote", index: void 0, caseSensitive: void 0, module: "/build/routes/newQuote-JHNCV2VF.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "7e828d98", hmr: { runtime: "/build/_shared/chunk-SWY5ICHL.js", timestamp: 1714256109924 }, url: "/build/manifest-7E828D98.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/newQuote": {
    id: "routes/newQuote",
    parentId: "root",
    path: "newQuote",
    index: void 0,
    caseSensitive: void 0,
    module: newQuote_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
