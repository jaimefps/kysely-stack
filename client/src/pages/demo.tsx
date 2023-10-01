import {
  TaskContainerQuery,
  useTaskContainerQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../generated/graphql-codegen"
import { memberAuth } from "../auth"
import { Centered } from "../shared/centered"

function getIdOfLast(tasks: TaskContainerQuery["tasks"]) {
  return tasks?.[tasks?.length - 1]?.id ?? 0
}

export function Demo() {
  const InfoResult = useTaskContainerQuery()

  const mutationConfig = {
    onCompleted() {
      InfoResult.refetch()
    },
  }

  const [Create] = useCreateTaskMutation(mutationConfig)
  const [Update] = useUpdateTaskMutation(mutationConfig)
  const [Delete] = useDeleteTaskMutation(mutationConfig)

  const flex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }

  return (
    <Centered>
      <div>
        <h2
          style={{
            marginBottom: 10,
          }}
        >
          Demo
        </h2>
        <div
          id="container"
          style={{
            width: 600,
            height: 600,
            display: "flex",
            gap: 10,
          }}
        >
          <div
            id="controls"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <button
              onClick={() =>
                Create({
                  variables: {
                    title: "ClientTodo",
                  },
                })
              }
            >
              add one
            </button>
            <button
              disabled={!InfoResult.data?.tasks?.length}
              onClick={() => {
                Update({
                  variables: {
                    id: getIdOfLast(InfoResult.data?.tasks),
                    title: "ClientTodo" + Date.now(),
                  },
                })
              }}
            >
              update last
            </button>
            <button
              disabled={!InfoResult.data?.tasks?.length}
              onClick={() => {
                Delete({
                  variables: {
                    id: getIdOfLast(InfoResult.data?.tasks),
                  },
                })
              }}
            >
              delete last
            </button>
            <button
              id="logout"
              style={{ justifySelf: "flex-end" }}
              onClick={memberAuth.logout}
            >
              log out
            </button>
          </div>
          <div
            id="tasks"
            style={{
              padding: 10,
              borderRadius: 2,
              backgroundColor: "black",
              overflow: "auto",
              width: 400,
            }}
          >
            <pre>
              {InfoResult.loading
                ? "loading..."
                : JSON.stringify(InfoResult.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </Centered>
  )
}
