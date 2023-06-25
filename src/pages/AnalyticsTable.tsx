import { useNavigate, useParams } from "react-router-dom";
import { InventorySummary } from "../components/inventory";
import {
  Body,
  Content,
  Header,
  Navbar,
  Subtitle,
  Title,
} from "../components/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../core";
import { InventoryState } from "../components/inventory/ItemTable";
import { Inventory } from "../entities";
import { DocumentNotFoundError, getInventoryOfUser } from "../config/Database";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Pagina con lista degli inventari
const AnalyticsTable = () => {
  const navigate = useNavigate();
  const params = useParams();

  const docId = params.id;
  const user = useContext(AuthContext);

  const [inventoryState, setInventoryState] = useState<InventoryState>({
    inventory: new Inventory(null, "", "", [], 0),
    edited: false,
  });

  // Al momento del rendering, ottengo le informazioni relative all'utente e all'inventario
  useEffect(() => {
    if (user && docId) {
      // Ottengo l'inventario attuale e imposto lo stato
      getInventoryOfUser(user, docId)
        .then((res) => {
          if (res.length) {
            const inventory = res[0].data();

            setInventoryState((state) => ({
              ...state,
              inventory: new Inventory(
                inventory.uid,
                inventory.name,
                inventory.owner,
                inventory.items,
                inventory.capacity,
                inventory.value,
                inventory.history,
                inventory.createdAt,
                inventory.updatedAt
              ),
            }));
          }
        })
        .catch((err) => {
          switch (err.constructor) {
            case DocumentNotFoundError:
            default:
              navigate("/home");
              break;
          }
        });
    } else navigate("/inventory");
  }, [navigate, user, docId]);

  return (
    <Body>
      <Navbar page="ANALYTICS" />
      <Header>
        <Title>Infografica</Title>
      </Header>
      <Content>
        <Subtitle>{inventoryState.inventory.name}</Subtitle>

        <ResponsiveContainer minHeight={400}>
          {inventoryState.inventory.history && (
            <LineChart
              data={inventoryState.inventory.history}
              width={200}
              height={200}
              style={{ fontSize: "10px" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="_value" stroke="#ff4040" />
              <Line type="monotone" dataKey="_mean" stroke="#82ca9d" />
              <Line type="monotone" dataKey="_deviation" stroke="#1f74d6" />
            </LineChart>
          )}
        </ResponsiveContainer>

        <InventorySummary inventoryState={inventoryState} />
      </Content>
    </Body>
  );
};

export default AnalyticsTable;
